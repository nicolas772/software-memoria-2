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
      const allIterations = await Iteration.findAll({
         where: {
            studyId: idStudy,
         }
      });

      if (!allIterations) {
         return res.status(404).json({ error: "Estudio no encontrado." });
      }
      const result = {
         [rangos[0]]: 0,
         [rangos[1]]: 0,
         [rangos[2]]: 0,
         [rangos[3]]: 0,
         [rangos[4]]: 0,
      };

      for (const iteration of allIterations) {
         const idIteration = iteration.id;
         const allIterationStates = await IterationState.findAll({
            where: {
               iterationId: idIteration,
            }
         })
         const allUserIds = allIterationStates.map(iterationState => {
            if (!iterationState.inTask && !iterationState.inCSUQ && !iterationState.inQuestion) {
               return iterationState.userId
            }
         });
         const allUsersByRange = await getUserIdsBySexAndRange(allUserIds, "todos")
         
         for (const key of Object.keys(result)) {
            result[key] += allUsersByRange[key].length;
         }
      }


      const series = Object.values(result)
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

async function getUserIdsBySexAndRange(allUserIds, sexo) {
   try {
      let users
      if (sexo === "todos") {
         users = await User.findAll({
            attributes: ['id', 'birthday', 'sex'],
            where: {
               id: allUserIds,
            },
         });
      } else {
         users = await User.findAll({
            attributes: ['id', 'birthday', 'sex'],
            where: {
               id: allUserIds,
               sex: sexo,
            },
         });
      }

      const result = {
         [rangos[0]]: [],
         [rangos[1]]: [],
         [rangos[2]]: [],
         [rangos[3]]: [],
         [rangos[4]]: [],
      };
      result.name = sexo
      const currentDate = moment();

      users.forEach((user) => {
         const age = currentDate.diff(moment(user.birthday), 'years');

         if (age <= 13) {
            result[rangos[0]].push(user.id);
         } else if (age <= 18) {
            result[rangos[1]].push(user.id);
         } else if (age <= 35) {
            result[rangos[2]].push(user.id);
         } else if (age <= 60) {
            result[rangos[3]].push(user.id);
         } else {
            result[rangos[4]].push(user.id);
         }
      });

      return result;
   } catch (error) {
      console.error(error);
      throw new Error('Error al obtener usuarios por sexo y rango etario');
   }
}