const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

exports.testerBoard = (req, res) => {
  const idUser = req.headers["id"];
  console.log(idUser)
  //aqui hacer logica para rescatar todos los datos de las cards
  const responseData = {
    "iteraciones_activas": "45",
    "usuarios_activos": "25",
    "porc_iteraciones_completadas": "56%",
    "porc_estudios_completados": "94%"
  }
  res.status(200).json(responseData)
};
