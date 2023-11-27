const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const IterationState = db.iterationstate
const GeneralSentiment = db.generalsentiment
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize

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

      const allGeneralSentiment = await GeneralSentiment.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allGeneralSentiment || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }

      const allSentimentQty = allGeneralSentiment.length
      let sum_score = 0
      let sum_words = 0
      let sum_hits = 0
      for (const sentiment of allGeneralSentiment) {
         sum_score += sentiment.score
         sum_words += sentiment.numwords
         sum_hits += sentiment.numhits
      }
      if (allSentimentQty > 0) {
         avg_score = sum_score / allSentimentQty
         avg_words = sum_words / allSentimentQty
         avg_hits = sum_hits / allSentimentQty
      }
      //CARD 1: Sentimiento General Usuarios
      let sentiment = avg_score > 0 ? "Positivo" : avg_score < 0 ? "Negativo" : "Neutro";

      const generalSentiment = {
         title: "Sentimiento General Usuarios",
         metric: `${sentiment} ${emojiMapSentiment[sentiment]}`,
         columnName1: "Métrica",
         columnName2: "Valor",
         data: [
            {
               name: "Score Promedio",
               stat: avg_score.toFixed(2),
               icon: "score",
            },
            {
               name: "Promedio Palabras por opinión",
               stat: avg_words.toFixed(2),
               icon: "palabras",
            },
            {
               name: "Promedio Hits por opinión",
               stat: avg_hits.toFixed(2),
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

exports.cloudWord = async (req, res) => {
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

      const data = [
         { value: 'jQuery', count: 200 },
         { value: 'MongoDB', count: 18 },
         { value: 'JavaScript', count: 38 },
         { value: 'React', count: 30 },
         { value: 'Nodejs', count: 28 },
         { value: 'Express.js', count: 25 },
         { value: 'HTML5', count: 33 },
         { value: 'CSS3', count: 20 },
         { value: 'Webpack', count: 22 },
         { value: 'Babel.js', count: 7 },
         { value: 'ECMAScript', count: 25 },
         { value: 'Jest', count: 15 },
         { value: 'Mocha', count: 17 },
         { value: 'React Native', count: 27 },
         { value: 'Angular.js', count: 30 },
         { value: 'TypeScript', count: 15 },
         { value: 'Flow', count: 30 },
         { value: 'NPM', count: 11 },
      ]

      const responseData = {
         data: data,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};
