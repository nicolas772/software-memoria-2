const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idUser = req.headers["id"];

   try {
      const TotalIteraciones = {
         title: "Total Iteraciones",
         metric: "25",
         columnName1: "Estado Iteración",
         columnName2: "Cantidad Iteraciones",
         data: [
            {
               name: "Activas",
               stat: "10",
               icon: "activa",
            },
            {
               name: "Creadas",
               stat: "7",
               icon: "creada",
            },
            {
               name: "Finalizadas",
               stat: "8",
               icon: "finalizado"
            },
         ]
      };
      const TotalUsuarios = {
         title: "Total Usuarios",
         metric: "200",
         columnName1: "Estado Usuarios",
         columnName2: "Cantidad Usuarios",
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