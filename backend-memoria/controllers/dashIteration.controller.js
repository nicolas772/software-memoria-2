const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask

exports.cards = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allTasks = await Task.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allTasks || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }
      //CARD 1: Total Iteraciones
      const total_task = allTasks.length
      const easyTask = allTasks.filter(task => task.dificulty === "Fácil").length;
      const mediumTask = allTasks.filter(task => task.dificulty === "Medio").length;
      const hardTask = allTasks.filter(task => task.dificulty === "Difícil").length;


      const totalTask = {
         title: "Total Tareas",
         metric: total_task,
         columnName1: "Dificultad",
         columnName2: "Tareas",
         data: [
            {
               name: "Fácil",
               stat: easyTask,
               icon: "facil",
            },
            {
               name: "Medio",
               stat: mediumTask,
               icon: "medio",
            },
            {
               name: "Dificil",
               stat: hardTask,
               icon: "dificil"
            },
         ]
      };

      //CARD 2: Total Usuarios
      const users_active = iteration.users_qty
      const users_complete = iteration.users_qty_complete
      const total_users = users_active + users_complete

      const totalUsers = {
         title: "Total Usuarios",
         metric: total_users,
         columnName1: "Estado Usuarios",
         columnName2: "Usuarios",
         data: [
            {
               name: "En proceso",
               stat: users_active,
               icon: "proceso",
            },
            {
               name: "Finalizados",
               stat: users_complete,
               icon: "finalizado",
            }
         ]
      };

      const responseData = {
         total_tareas: totalTask,
         total_usuarios: totalUsers,
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.tableTime = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const allTasks = await Task.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allTasks) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }

      const responseData = []

      for (const task of allTasks) {
         const idTask = task.id
         const name = task.title
         const minutesOptimal = task.minutes_optimal
         const secondsOptimal = task.seconds_optimal
         const tasks = await InfoTask.findAll({
            where: {
               taskId: idTask,
            },
         });
         if (tasks.length > 0) {
            const taskQty = tasks.length
            const averageDuration = tasks.reduce((total, task) => total + task.duration, 0) / taskQty;
            const roundedAverageDuration = Math.round(averageDuration / 1000) * 1000;
            const optTime = minutesSecondsToMilliseconds(minutesOptimal, secondsOptimal);
            const diference = roundedAverageDuration - optTime
            responseData.push({
               name: name,
               avgTime: roundedAverageDuration,
               optTime: optTime,
               diference: diference,
            })
         }
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

function minutesSecondsToMilliseconds(minutes, seconds) {
   const totalSeconds = minutes * 60 + seconds;
   return totalSeconds * 1000; // Convertir segundos a milisegundos
}