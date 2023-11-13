const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idUser = req.headers["id"];
   const idStudy= req.query.idStudy;
   try {
      const allIterations = await Iteration.findAll({
         where:{
           studyId: idStudy,
         }
       })
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
      const TotalUsuarios = {
         title: "Total Usuarios",
         metric: "200",
         columnName1: "Estado Usuarios",
         columnName2: "Usuarios",
         data: [
            {
               name: "En Proceso",
               stat: "150",
               icon: "proceso"
            },
            {
               name: "Finalizados",
               stat: "50",
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