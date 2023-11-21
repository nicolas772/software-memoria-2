const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idStudy = req.query.idStudy;

   try {
      avg_scoresus = 95.33
      avg_intqual = (4 / 7) * 100
      avg_infoqual = (3 / 7) * 100
      avg_sysuser = (2 / 7) * 100

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

exports.boxPlot = async (req, res) => {
   const idStudy = req.query.idStudy;

   try {
      const series = [
         {
            type: 'boxPlot',
            data: [
               {
                  x: 'Iteración 1',
                  y: [54, 66, 69, 75, 100]
               },
               {
                  x: 'Iteración 2',
                  y: [43, 65, 69, 76, 81]
               },
               {
                  x: 'Iteración 3',
                  y: [31, 39, 45, 51, 59]
               },
               {
                  x: 'Iteración 4',
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

exports.barChart = async (req, res) => {
   const idStudy = req.query.idStudy;

   try {
      const chartData = [
         {
            name: `Iteración 1`,
            "Promedio Score Sus": 0.9,
            "Promedio Interfaz Quality": 0.8,
            "Promedio Info Quality": 0.7,
            "Promedio Sys Use": 0.6
         },
         {
            name: `Iteración 2`,
            "Promedio Score Sus": 0.9,
            "Promedio Interfaz Quality": 0.8,
            "Promedio Info Quality": 0.7,
            "Promedio Sys Use": 0.6
         },
         {
            name: `Iteración 3`,
            "Promedio Score Sus": 0.9,
            "Promedio Interfaz Quality": 0.8,
            "Promedio Info Quality": 0.7,
            "Promedio Sys Use": 0.6
         },

      ];


      const colors = ["emerald", "rose", "emerald", "rose"];
      const categories = [
         "Promedio Score Sus",
         "Promedio Interfaz Quality",
         "Promedio Info Quality",
         "Promedio Sys Use"
      ];

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