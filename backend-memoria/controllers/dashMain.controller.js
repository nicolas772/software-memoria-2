const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;

exports.testerBoard = async (req, res) => {
  const idUser = req.headers["id"];

  try {
    const user = await User.findByPk(idUser, {
      include: [
        {
          model: Study,
          include: {
            model: Iteration,
            where: { state: "Activa" }
          }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const activeIterationsCount = user.studies.reduce((total, study) => {
      return total + study.iterations.length;
    }, 0);

    const responseData = {
      iteraciones_activas: activeIterationsCount,
      usuarios_activos: 25, // Aquí debes obtener la cantidad de usuarios activos.
      porc_iteraciones_completadas: "56%", // Calcula esto según tus necesidades.
      porc_estudios_completados: "94%" // Calcula esto según tus necesidades.
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener las iteraciones activas" });
  }
};
