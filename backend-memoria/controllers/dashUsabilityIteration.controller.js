const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const CsuqAnswers = db.csuqanswers
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
   const idIteration = req.query.idIteration;

   try {

      const allAnswers = await CsuqAnswers.findAll({
         where: {
            iterationId: idIteration,
         }
      })
      const allAnswersQty = allAnswers.length

      let intqual = 0
      let infoqual = 0
      let sysuse = 0
      let scoresus = 0

      for (const answer of allAnswers) {
         scoresus += answer.scoresus
         intqual += answer.avgintqual
         infoqual += answer.avginfoqual
         sysuse += answer.avgsysuse
      }

      let avg_intqual = 0
      let avg_infoqual = 0
      let avg_sysuse = 0
      let avg_scoresus = 0

      if (allAnswersQty > 0) {
         avg_intqual = intqual / allAnswersQty
         avg_infoqual = infoqual / allAnswersQty
         avg_sysuse = sysuse / allAnswersQty
         avg_scoresus = scoresus / allAnswersQty
      }

      const perc_avg_intqual = (avg_intqual / 7) * 100
      const perc_avg_infoqual = (avg_infoqual / 7) * 100
      const perc_avg_sysuse = (avg_sysuse / 7) * 100

      const responseData = {
         promedio_scoresus: avg_scoresus.toFixed(1) + "%",
         promedio_intqual: perc_avg_intqual.toFixed(1) + "%",
         promedio_infoqual: perc_avg_infoqual.toFixed(1) + "%",
         promedio_sysuse: perc_avg_sysuse.toFixed(1) + "%"
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
      const allAnswers = await CsuqAnswers.findAll({
         where: {
            iterationId: idIteration,
         }
      })
      const allAnswersQty = allAnswers.length
      const questions = ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7", "Pregunta 8", "Pregunta 9", "Pregunta 10", "Pregunta 11", "Pregunta 12", "Pregunta 13", "Pregunta 14", "Pregunta 15", "Pregunta 16"];
      const responseData = questions.map((question, index) => ({
         name: question,
         avg: 0,
         min: 0,
         max: 0,
         diference: 0,
         column: `answer${index + 1}`,
         index: index
      }));

      for (const question of responseData) {
         const columnName = question.column
         let minimo = 8
         let maximo = -1
         let suma = 0
         for (const answer of allAnswers) {
            const value = answer[columnName]
            suma += value
            if (value>maximo) {
               maximo = value
            }
            if (value<minimo){
               minimo=value
            }
         }
         question.min = minimo
         question.max = maximo
         question.diference = maximo-minimo
         question.avg = suma/allAnswersQty
      }

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