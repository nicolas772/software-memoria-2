const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
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
      })

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado no encontrada." });
      }

      const charData = [
         {
            name: "Iteración 1",
            "Tiempo Promedio": 2488,
         },
         {
            name: "Iteración 2",
            "Tiempo Promedio": 1445,
         },
         {
            name: "Iteración 3",
            "Tiempo Promedio": 743,
         },
      ]

      const colors = ["blue"]
      const categories = ["Tiempo Promedio"]

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