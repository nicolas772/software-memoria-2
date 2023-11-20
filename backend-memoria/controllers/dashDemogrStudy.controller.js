const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const IterationState = db.iterationstate
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize
const moment = require('moment');

const rangos = ["Niños", "Adolescentes", "Jovenes", "Adultos", "Adulto Mayores"]

exports.cards = async (req, res) => {
   const idStudy = req.query.idStudy;
   try {
      //CARD 1: Cantidad usuarios

      const allIterations = await Iteration.findAll({
         where: {
            studyId: idStudy,
         }
      });

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado." });
      }

      const chartData = [];
      let users_qty_complete = 0
      let male_qty = 0
      let female_qty = 0
      let no_informed_qty = 0

      for (const iteration of allIterations) {
         const idIteration = iteration.id;
         const allIterationStates = await IterationState.findAll({
            where: {
               iterationId: idIteration,
            }
         })
         users_qty_complete += iteration.users_qty_complete
         const allUserIds = allIterationStates.map(iterationState => {
            if (!iterationState.inTask && !iterationState.inCSUQ && !iterationState.inQuestion) {
               return iterationState.userId
            }
         });
         const maleIds = await getIdsBySex(allUserIds, "Masculino")
         const femaleIds = await getIdsBySex(allUserIds, "Femenino")
         const noInformedIds = await getIdsBySex(allUserIds, "No Informado")

         male_qty += maleIds.length
         female_qty += femaleIds.length
         no_informed_qty += noInformedIds.length

      }

      const cantUsuarios = {
         title: "Cantidad Usuarios",
         metric: users_qty_complete,
         columnName1: "Género",
         columnName2: "Usuarios",
         data: [
            {
               name: "Masculino",
               stat: male_qty,
               icon: "hombre",
            },
            {
               name: "Femenino",
               stat: female_qty,
               icon: "mujer",
            },
            {
               name: "No Informado",
               stat: no_informed_qty,
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
   const idStudy = req.query.idStudy;
   try {

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
   const idStudy = req.query.idStudy;
   try {

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


      const colors = ["green", "yellow", "purple", "blue", "orange"];

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

async function getIdsBySex(allUserIds, sex) {
   try {
      const users = await User.findAll({
         where: {
            id: allUserIds,
            sex: sex,
         },
      });
      const userIds = users.map(user => user.id);
      return userIds;
   } catch (error) {
      console.error(error);
      throw new Error('Error al obtener usuarios por sexo y rango etario');
   }
}