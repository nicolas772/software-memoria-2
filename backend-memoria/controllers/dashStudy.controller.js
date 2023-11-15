const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const InfoTask = db.infotask
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idUser = req.headers["id"];
   const idStudy = req.query.idStudy;
   try {
      const allIterations = await Iteration.findAll({
         where: {
            studyId: idStudy,
         }
      })

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado no encontrada." });
      }

      //CARD 1: Total Iteraciones
      const total_iterations = allIterations.length
      const finishedIterationsCount = allIterations.filter(iteration => iteration.state === "Finalizada").length;
      const activeIterationsCount = allIterations.filter(iteration => iteration.state === "Activa").length;
      const createIterationsCount = allIterations.filter(iteration => iteration.state === "Creada").length;

      const TotalIteraciones = {
         title: "Total Iteraciones",
         metric: total_iterations,
         columnName1: "Estado Iteración",
         columnName2: "Iteraciones",
         data: [
            {
               name: "Activas",
               stat: activeIterationsCount,
               icon: "activa",
            },
            {
               name: "Creadas",
               stat: createIterationsCount,
               icon: "creada",
            },
            {
               name: "Finalizadas",
               stat: finishedIterationsCount,
               icon: "finalizado"
            },
         ]
      };

      //CARD 2: Total Usuarios
      const usersQtyCompleteSum = await Iteration.sum('users_qty_complete', {
         where: {
            id: allIterations.map(iteration => iteration.id)
         }
      });
      const usersQtyActiveSum = await Iteration.sum('users_qty', {
         where: {
            id: allIterations.map(iteration => iteration.id)
         }
      });

      const allUsersSum = usersQtyCompleteSum + usersQtyActiveSum

      const TotalUsuarios = {
         title: "Total Usuarios",
         metric: allUsersSum,
         columnName1: "Estado Usuarios",
         columnName2: "Usuarios",
         data: [
            {
               name: "En Proceso",
               stat: usersQtyActiveSum,
               icon: "proceso"
            },
            {
               name: "Finalizados",
               stat: usersQtyCompleteSum,
               icon: "finalizado"
            }
         ]
      }

      const responseData = {
         total_iteraciones: TotalIteraciones,
         total_usuarios: TotalUsuarios
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.barList = async (req, res) => {
   const idUser = req.headers["id"];
   const idStudy = req.query.idStudy;

   try {
      const allIterations = await Iteration.findAll({
         where: {
            studyId: idStudy,
         }
      });

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado." });
      }

      const chartData = [];

      for (const iteration of allIterations) {
         const iterationId = iteration.id;
         const iterationNumber = iteration.iteration_number

         // Busca todas las tareas relacionadas con la iteración actual
         const tasks = await InfoTask.findAll({
            where: {
               iterationId: iterationId,
            }
         });

         if (tasks.length > 0) {
            // Calcula el tiempo promedio de las tareas
            const averageDuration = tasks.reduce((total, task) => total + task.duration, 0) / tasks.length;
            // Aproxima a la unidad de mil más cercana
            const roundedAverageDuration = Math.round(averageDuration / 1000) * 1000;

            chartData.push({
               name: `Iteración ${iterationNumber}`,
               value: roundedAverageDuration,
               //href: `${idStudy}/${iterationId}`,
               target: "_self",
            });
         } else {
            chartData.push({
               name: `Iteración ${iterationNumber}`,
               value: 0, // Otra opción podría ser omitir esta iteración si no hay tareas
               //href: `${idStudy}/${iterationId}`,
               target: "_self",
            });
         }
      }

      const responseData = {
         chartData: chartData,
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.barChart = async (req, res) => {
   const idUser = req.headers["id"];
   const idStudy = req.query.idStudy;

   try {
      const allIterations = await Iteration.findAll({
         where: {
            studyId: idStudy,
         },
      });

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado." });
      }

      const chartData = [];

      for (const iteration of allIterations) {
         const iterationId = iteration.id;
         const iterationNumber = iteration.iteration_number
         const userSet = new Set();
         // Busca todas las tareas relacionadas con la iteración actual
         const tasks = await InfoTask.findAll({
            where: {
               iterationId: iterationId,
            },
         });
         // Calcula la cantidad de usuarios únicos que realizaron tareas
         tasks.forEach(task => userSet.add(task.userId));
         const usersQty_iteration = userSet.size
         // Calcula la cantidad de tareas completadas y no completadas
         const completedTasks = tasks.filter(task => task.complete === true).length;
         const notCompletedTasks = tasks.length - completedTasks;
         const averageCompletedTasks = completedTasks / usersQty_iteration
         const averageNotCompletedTasks = notCompletedTasks / usersQty_iteration

         chartData.push({
            name: `Iteración ${iterationNumber}`,
            "Promedio Tareas Completadas": averageCompletedTasks,
            "Promedio Tareas No Completadas": averageNotCompletedTasks,
         });
      }

      const colors = ["emerald", "rose"];
      const categories = ["Promedio Tareas Completadas", "Promedio Tareas No Completadas"];

      const responseData = {
         chartData: chartData,
         colors: colors,
         categories: categories,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.tableTime = async (req, res) => {
   const idUser = req.headers["id"];
   const idStudy = req.query.idStudy;
 
   try {
     const allIterations = await Iteration.findAll({
       where: {
         studyId: idStudy,
       },
     });
 
     if (!allIterations) {
       return res.status(404).json({ error: "Estudio no encontrado." });
     }
 
     const responseData = [];
 
     for (const iteration of allIterations) {
       const iterationId = iteration.id;
       const iterationNumber = iteration.iteration_number
       // Buscar todas las tareas relacionadas con la iteración actual
       const tasks = await InfoTask.findAll({
         where: {
           iterationId: iterationId,
         },
       });
 
       // Crear un objeto para almacenar los tiempos por usuario
       const userTimes = {};
 
       tasks.forEach(task => {
         if (!userTimes[task.userId]) {
           userTimes[task.userId] = 0;
         }
         userTimes[task.userId] += task.duration;
       });
 
       // Encontrar al usuario con el tiempo máximo y al usuario con el tiempo mínimo
       const maxUserId = Object.keys(userTimes).reduce((a, b) => userTimes[a] > userTimes[b] ? a : b);
       const minUserId = Object.keys(userTimes).reduce((a, b) => userTimes[a] < userTimes[b] ? a : b);
 
       // Convertir los tiempos a un formato "m minutos s segundos"
       const maxTiempo = formatTime(userTimes[maxUserId]);
       const minTiempo = formatTime(userTimes[minUserId]);
 
       // Calcular la diferencia de tiempo
       const diferencia = formatTime(userTimes[maxUserId] - userTimes[minUserId]);
 
       responseData.push({
         name: `Iteración ${iterationNumber}`,
         maxTiempo: maxTiempo,
         minTiempo: minTiempo,
         diferencia: diferencia,
       });
     }
 
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
 

