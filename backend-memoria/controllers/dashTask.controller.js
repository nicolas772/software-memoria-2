const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize

exports.cards = async (req, res) => {
   const idTask = req.query.idTask;
   try {
      const task = await Task.findOne({
         where: {
            id: idTask
         }
      })
      const allInfoTasks = await InfoTask.findAll({
         where: {
            taskId: idTask,
         }
      })

      if (!allInfoTasks || !task) {
         return res.status(404).json({ error: "Tarea No Encontrada." });
      }
      const info_task_qty = allInfoTasks.length


      //CARD 3: Tiempo Optimo

      const minutesOptimal = task.minutes_optimal
      const secondsOptimal = task.seconds_optimal
      const optimalTime = minutesOptimal + "m " + secondsOptimal + "s"
      let responseData

      if (info_task_qty > 0) {
         //CARD 1: Porcentaje de éxito de tarea
         const completedTasks = allInfoTasks.filter(task => task.complete === true).length;
         const avgSuccessNoFormat = info_task_qty / completedTasks
         const avgSuccess = (avgSuccessNoFormat * 100).toFixed(1) + "%";

         //CARD 2: Tiempo promedio de tarea

         const totalDuration = allInfoTasks.reduce((total, task) => total + task.duration, 0);
         const avgDuration = totalDuration / info_task_qty;
         const roundedAverageDuration = Math.round(avgDuration / 1000) * 1000;

         //CARD 4: Diferencia Tiempo

         const optTimeMili = minutesSecondsToMilliseconds(minutesOptimal, secondsOptimal);
         const diference = Math.abs(roundedAverageDuration - optTimeMili)
         responseData = {
            porcentaje_exito: avgSuccess,
            tiempo_promedio: formatTime(roundedAverageDuration),
            tiempo_optimo: optimalTime,
            diferencia: formatTime(diference)
         };
      } else {
         responseData = {
            porcentaje_exito: "0%",
            tiempo_promedio: formatTime(0),
            tiempo_optimo: optimalTime,
            diferencia: formatTime(0)
         };
      }



      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.barChart = async (req, res) => {
   const idTask = req.query.idTask;
   try {
      const rango1 = "Niños";
      const rango2 = "Adolescentes";
      const rango3 = "Joven";
      const rango4 = "Adulto";
      const rango5 = "Adulto Mayor";
      const chartData1 = [
         {
            name: "Hombre",
            [rango1]: 0.1,
            [rango3]: 0.2,
            [rango4]: 0.3,
            [rango5]: 0.1,
         },
         {
            name: "Mujer",
            [rango1]: 0.6,
            [rango2]: 0.7,
            [rango3]: 0.8,
         },
         {
            name: "No Informado",
            [rango1]: 0.6,
            [rango2]: 0.7,
         },
      ];

      const chartData2 = [
         {
            name: "Hombre",
            [rango1]: 6000,
            [rango3]: 700000,
            [rango4]: 23000,
            [rango5]: 430000,
         },
         {
            name: "Mujer",
            [rango3]: 700000,
            [rango4]: 23000,
            [rango5]: 430000,
         },
         {
            name: "No Informado",
            [rango1]: 6000,
            [rango3]: 700000,
         },
      ];

      const colors = ["emerald", "rose", "blue", "indigo", "yellow"];
      const categories = [rango1, rango2, rango3, rango4, rango5];
      const responseData = {
         chartData1: chartData1,
         chartData2: chartData2,
         colors: colors,
         categories: categories,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

// Función para convertir milisegundos a "m minutos s segundos"
function formatTime(milliseconds) {
   const totalSeconds = Math.floor(milliseconds / 1000);
   const minutes = Math.floor(totalSeconds / 60);
   const remainingSeconds = totalSeconds % 60;
   return `${minutes}m ${remainingSeconds}s`;
}

function minutesSecondsToMilliseconds(minutes, seconds) {
   const totalSeconds = minutes * 60 + seconds;
   return totalSeconds * 1000; // Convertir segundos a milisegundos
}