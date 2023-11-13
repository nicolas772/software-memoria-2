const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
  const idUser = req.headers["id"];

  try {
    const responseData = {
        title: "Total users",
        metric: "10,345",
        subCategoryValues: [30, 70],
        subCategroyColors: ["emerald", "red"],
        subCategoryTitles: ["Active users", "Inactive users"],
      };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
  }
};