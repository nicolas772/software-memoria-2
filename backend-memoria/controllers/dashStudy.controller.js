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
            },
            {
               name: "Creadas",
               stat: "7",
            },
            {
               name: "Finalizadas",
               stat: "8",
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
            },
            {
               name: "Finalizados",
               stat: "50",
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