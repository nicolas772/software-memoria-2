const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idIteration = req.query.idIteration;

   try {
      avg_scoresus = 84, 765
      avg_intqual = (6.4 / 7) * 100
      avg_infoqual = (7 / 7) * 100
      avg_sysuser = (4.8999 / 7) * 100

      const responseData = {
         promedio_scoresus: avg_scoresus.toFixed(1) + "%",
         promedio_intqual: avg_intqual.toFixed(1) + "%",
         promedio_infoqual: avg_infoqual.toFixed(1) + "%",
         promedio_sysuse: avg_sysuser.toFixed(1) + "%"
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.tableAvg = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {

      const responseData = [
         {
            name: "Pregunta 1",
            avg: 6.7,
            min: 3,
            max: 7,
            diference: 4
         },
         {
            name: "Pregunta 2",
            avg: 6.7,
            min: 3,
            max: 7,
            diference: 3
         },
         {
            name: "Pregunta 3",
            avg: 6.7,
            min: 3,
            max: 7,
            diference: 2
         },
         {
            name: "Pregunta 4",
            avg: 6.7,
            min: 3,
            max: 7,
            diference: 0
         },
      ]
      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.boxPlot = async (req, res) => {
   const idIteration = req.query.idIteration;

   try {
      const series = [
         {
            type: 'boxPlot',
            data: [
               {
                  x: 'Score Sus General',
                  y: [54, 66, 69, 75, 100]
               },
               {
                  x: 'Interfaz Quality',
                  y: [43, 65, 69, 76, 81]
               },
               {
                  x: 'Info Quality',
                  y: [31, 39, 45, 51, 59]
               },
               {
                  x: 'System Usability',
                  y: [39, 46, 55, 65, 71]
               },
            ]
         }
      ]

      const responseData = {
         series: series
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};