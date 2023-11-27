const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const IterationState = db.iterationstate
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize
const moment = require('moment');

const rangos = ["Niños", "Adolescentes", "Jovenes", "Adultos", "Adulto Mayores"]
const colorMapSentiment = {
   Positivo: "green",
   Neutro: "yellow",
   Negativo: "red",
}
const emojiMapSentiment = {
   Positivo: "😁",
   Neutro: "😶",
   Negativo: "🙁",
}

exports.cards = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allIterationStates = await IterationState.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allIterationStates || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }
      //CARD 1: Sentimiento General Usuarios
      const sentiment = "Positivo"

      const generalSentiment = {
         title: "Sentimiento General Usuarios",
         metric: `${sentiment} ${emojiMapSentiment[sentiment]}`,
         columnName1: "Métrica",
         columnName2: "Valor",
         data: [
            {
               name: "Score Promedio",
               stat: 0.35,
               icon: "score",
            },
            {
               name: "Promedio Palabras por opinión",
               stat: 35,
               icon: "palabras",
            },
            {
               name: "Promedio Hits por opinión",
               stat: 14,
               icon: "hits"
            },
         ]
      };

      const responseData = {
         sentimiento_general: generalSentiment,
         color: colorMapSentiment[sentiment]
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.pieChart = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allIterationStates = await IterationState.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allIterationStates || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }


      const series = [5, 10, 15]
      const colors = ['#28a745', '#ffc107', '#dc3545']
      const labels = ["Positivo", "Neutro", "Negativo"]

      const responseData = {
         series: series,
         labels: labels,
         colors: colors
      }
      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.carousel = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allIterationStates = await IterationState.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allIterationStates || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }


      const opinions = [
         "Me parecio un excelente software.",
         "No me gusto mucho, pienso que puede mejorar mucho la interfaz.",
         "Expectacular, nada que decir. Los colores y las animaciones me parecieron impecables, el tamaño de la letra super bien."
      ]

      const responseData = {
         opiniones: opinions
      }
      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.barChart = async (req, res) => {
   const idIteration = req.query.idIteration;

   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allIterationStates = await IterationState.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allIterationStates || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }


      const scores = [
         10.45, 5.42, 5.9, -20.42,
      ]

      const users = [
         'User 1', 'User 2', 'User 3', 'User 4',
      ];

      const responseData = {
         chartData: scores,
         categories: users,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};
