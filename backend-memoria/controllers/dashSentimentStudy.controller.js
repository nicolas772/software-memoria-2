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
      //CARD 1: Sentimiento General Usuarios
      const arrConfident = []
      const arrScorePromedio = []
      const arrWordsPromedio = []
      const arrHitsPromedio = []

      for (const iteration of allIterations) {
         const idIteration = iteration.id
         const allGeneralSentiment = await GeneralSentiment.findAll({
            where: {
               iterationId: idIteration,
               falsepositive: false
            }
         })

         const allGeneralSentiment_with_falses = await GeneralSentiment.findAll({
            where: {
               iterationId: idIteration,
            }
         })

         if (!allGeneralSentiment || !allGeneralSentiment_with_falses || !iteration) {
            return res.status(404).json({ error: "Iteración No Encontrada." });
         }

         //Confident
         const allSentimentQty = allGeneralSentiment.length
         const allSentimentWithFalsesQty = allGeneralSentiment_with_falses.length
         let confident = 1
         if (allSentimentWithFalsesQty > 0) {
            confident = (allSentimentQty / allSentimentWithFalsesQty) * 100
            arrConfident.push(confident)
         }
         let sum_score = 0
         let sum_words = 0
         let sum_hits = 0
         let avg_score = 0
         let avg_words = 0
         let avg_hits = 0
         for (const sentiment of allGeneralSentiment) {
            sum_score += sentiment.score
            sum_words += sentiment.numwords
            sum_hits += sentiment.numhits
         }
         if (allSentimentQty > 0) {
            avg_score = sum_score / allSentimentQty
            avg_words = sum_words / allSentimentQty
            avg_hits = sum_hits / allSentimentQty
            arrScorePromedio.push(avg_score)
            arrWordsPromedio.push(avg_words)
            arrHitsPromedio.push(avg_hits)
         }
      }

      const avgConfidentAll = calcularPromedio(arrConfident)
      const avgScoreAll = calcularPromedio(arrScorePromedio)
      const avgWordsAll = calcularPromedio(arrWordsPromedio)
      const avgHitsAll = calcularPromedio(arrHitsPromedio)
      
      let sentiment_all = avgScoreAll > 0 ? "Positivo" : avgScoreAll < 0 ? "Negativo" : "Neutro";

      const generalSentiment = {
         title: "Sentimiento General Usuarios",
         metric: `${sentiment_all} ${emojiMapSentiment[sentiment_all]}`,
         columnName1: "Métrica",
         columnName2: "Valor",
         data: [
            {
               name: "Score Promedio",
               stat: avgScoreAll.toFixed(2),
               icon: "score",
            },
            {
               name: "Confianza",
               stat: avgConfidentAll.toFixed(0) + "%",
               icon: "activa",
            },
            {
               name: "Promedio Palabras por opinión",
               stat: avgWordsAll.toFixed(2),
               icon: "palabras",
            },
            {
               name: "Promedio Hits por opinión",
               stat: avgHitsAll.toFixed(2),
               icon: "hits"
            },
         ]
      };

      const responseData = {
         sentimiento_general: generalSentiment,
         color: colorMapSentiment[sentiment_all]
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.pieChart = async (req, res) => {
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


      const scores = [
         10.45, 5.42, 5.9, -20.42,
      ]

      const iterations = [
         'Iteracion 1', 'Iteracion 2', 'Iteracion 3', 'Iteracion 4',
      ];

      const responseData = {
         chartData: scores,
         categories: iterations,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.cloudWord = async (req, res) => {
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

function calcularPromedio(arr) {
   if (arr.length === 0) {
     return 0; // Manejar el caso de un array vacío para evitar dividir por cero
   }
 
   const suma = arr.reduce((total, elemento) => total + elemento, 0);
   const promedio = suma / arr.length;
 
   return promedio;
 }
