const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Task = db.task;
const InfoTask = db.infotask
const { Op } = require('sequelize'); // Necesitas importar Op desde sequelize

exports.cards = async (req, res) => {
   const idTask = req.query.idTask;
   try {
      const responseData = {
         porcentaje_exito: "95.7%",
         tiempo_promedio: "2m 34s",
         tiempo_optimo: "3m 0s",
         diferencia: "0m 26s"// Calcula esto según tus necesidades.
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};

exports.barChart = async (req, res) => {
   const idTask = req.query.idTask;
   try {
      const rango1 = "Niños";
      const rango2 = "Adolescentes";
      const rango3 = "Joven";
      const rango4 = "Adulto";
      const rango5 = "Adulto Mayor";
      const chartData1 = [
         {
            name: "Hombre",
            [rango1]: 0.1,
            [rango3]: 0.2,
            [rango4]: 0.3,
            [rango5]: 0.1,
         },
         {
            name: "Mujer",
            [rango1]: 0.6,
            [rango2]: 0.7,
            [rango3]: 0.8,
         },
         {
            name: "No Informado",
            [rango1]: 0.6,
            [rango2]: 0.7,
         },
      ];

      const chartData2 = [
         {
            name: "Hombre",
            [rango1]: 6000,
            [rango3]: 700000,
            [rango4]: 23000,
            [rango5]: 430000,
         },
         {
            name: "Mujer",
            [rango3]: 700000,
            [rango4]: 23000,
            [rango5]: 430000,
         },
         {
            name: "No Informado",
            [rango1]: 6000,
            [rango3]: 700000,
         },
      ];

      const colors = ["emerald", "rose", "blue", "indigo", "yellow"];
      const categories = [rango1, rango2, rango3, rango4, rango5];
      const responseData = {
         chartData1: chartData1,
         chartData2: chartData2,
         colors: colors,
         categories: categories,
      };

      res.status(200).json(responseData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
   }
};