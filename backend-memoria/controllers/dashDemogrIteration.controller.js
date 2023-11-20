const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize

const rangos = ["Niños", "Adolescentes", "Jovenes", "Adultos", "Adulto Mayores"]

exports.cards = async (req, res) => {
   const idIteration = req.query.idIteration;
   try {
      const iteration = await Iteration.findOne({
         where: {
            id: idIteration
         }
      })

      const allTasks = await Task.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allTasks || !iteration) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }
      //CARD 1: Cantidad usuarios

      const cantUsuarios = {
         title: "Cantidad Usuarios",
         metric: 10,
         columnName1: "Sexo",
         columnName2: "Usuarios",
         data: [
            {
               name: "Masculino",
               stat: 5,
               icon: "hombre",
            },
            {
               name: "Femenino",
               stat: 4,
               icon: "mujer",
            },
            {
               name: "No Informado",
               stat: 1,
               icon: "noIdentificado"
            },
         ]
      };

      const responseData = {
         cantidad_usuarios: cantUsuarios,
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
      const allTasks = await Task.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allTasks) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }

      const series = [2, 2, 3, 5, 1]
      const colors = ['#28a745', '#ffc108', '#6f42c1', '#007bff', '#fd7e14']

      const responseData = {
         series: series,
         labels: rangos,
         colors: colors
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
      const allTasks = await Task.findAll({
         where: {
            iterationId: idIteration,
         }
      })

      if (!allTasks) {
         return res.status(404).json({ error: "Iteración No Encontrada." });
      }

      const chartData = [
         {
            name: "Hombre",
            [rangos[0]]: 1,
            [rangos[1]]: 1,
            [rangos[2]]: 1,
            [rangos[3]]: 1,
            [rangos[4]]: 1,
         },
         {
            name: "Mujer",
            [rangos[0]]: 1,
            [rangos[1]]: 1,
            [rangos[2]]: 1,
            [rangos[3]]: 1,
            [rangos[4]]: 1,
         },
         {
            name: "No Informado",
            [rangos[0]]: 1,
            [rangos[1]]: 1,
            [rangos[2]]: 1,
            [rangos[3]]: 1,
            [rangos[4]]: 1,
         }
      ]


      const colors = ["emerald", "rose", "emerald", "rose", "emerald"];

      const responseData = {
         chartData: chartData,
         colors: colors,
         categories: rangos,
      };
      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};