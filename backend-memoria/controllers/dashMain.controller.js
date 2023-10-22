const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.testerBoard = async (req, res) => {
  const idUser = req.headers["id"];

  try {
    const user = await User.findByPk(idUser, {
      include: [
        {
          model: Study,
          include: Iteration
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const allIterations = user.studies.reduce((iterations, study) => {
      iterations.push(...study.iterations);
      return iterations;
    }, []);

    const activeIterationsCount = allIterations.filter(iteration => iteration.state === "Activa").length;

    const usersQtyCompleteSum = await Iteration.sum('users_qty_complete', {
      where: {
        id: allIterations.map(iteration => iteration.id)
      }
    });

    const responseData = {
      iteraciones_activas: activeIterationsCount,
      usuarios_participantes: usersQtyCompleteSum, // Obtén la cantidad de usuarios activos según tus necesidades.
      porc_iteraciones_completadas: "56%", // Calcula esto según tus necesidades.
      porc_estudios_completados: "94%" // Calcula esto según tus necesidades.
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
  }
};
