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

exports.stackedBar = async (req, res) => {
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

      const charData = [];

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

            charData.push({
               name: `Iteración ${iterationNumber}`,
               "Tiempo Promedio": averageDuration,
            });
         } else {
            charData.push({
               name: `Iteración ${iterationNumber}`,
               "Tiempo Promedio": 0, // Otra opción podría ser omitir esta iteración si no hay tareas
            });
         }
      }

      const colors = ["blue"];
      const categories = ["Tiempo Promedio"];

      const responseData = {
         charData: charData,
         colors: colors,
         categories: categories,
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};
