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
