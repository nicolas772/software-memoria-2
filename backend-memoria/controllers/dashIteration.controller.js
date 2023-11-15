const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask

exports.cards = async (req, res) => {
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
      //CARD 1: Total Iteraciones
      const total_task = allTasks.length
      const easyTask = allTasks.filter(task => task.dificulty === "Fácil").length;
      const mediumTask = allTasks.filter(task => task.dificulty === "Medio").length;
      const hardTask = allTasks.filter(task => task.dificulty === "Difícil").length;
      
      
      const totalTask = {
         title: "Total Tareas",
         metric: total_task,
         columnName1: "Dificultad",
         columnName2: "Tareas",
         data: [
            {
               name: "Fácil",
               stat: easyTask,
               icon: "facil",
            },
            {
               name: "Medio",
               stat: mediumTask,
               icon: "medio",
            },
            {
               name: "Dificil",
               stat: hardTask,
               icon: "dificil"
            },
         ]
      };
      const responseData = {
         total_tareas: totalTask,
      }

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};