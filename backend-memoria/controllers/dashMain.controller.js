const db = require("../models");
const User = db.user;
const Iteration = db.iteration;
const Study = db.study;
const { sequelize } = db; // Asegúrate de importar sequelize correctamente.

exports.cards = async (req, res) => {
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
    //CARD 1: Iteraciones Activas
    const activeIterationsCount = allIterations.filter(iteration => iteration.state === "Activa").length;
    
    //CARD 2: Usuarios Participantes
    const usersQtyCompleteSum = await Iteration.sum('users_qty_complete', {
      where: {
        id: allIterations.map(iteration => iteration.id)
      }
    });

    //CARD 3: % Iteraciones Completadas
    const totalIterationsCount = allIterations.length;
    const finishedIterationsCount = allIterations.filter(iteration => iteration.state === "Finalizada").length;
    const percentageFinishedIterations = (finishedIterationsCount / totalIterationsCount) * 100;

    //CARD 4: % Estudios Completados

    const allStudies = user.studies;
    const totalStudiesCount = allStudies.length;
    const finishedStudies = allStudies.filter(study => {
      return study.iterations.every(iteration => iteration.state === "Finalizada");
    });
    const finishedStudiesCount = finishedStudies.length;

    const percentageFinishedStudies = (finishedStudiesCount / totalStudiesCount) * 100;

    const responseData = {
      iteraciones_activas: activeIterationsCount,
      usuarios_participantes: usersQtyCompleteSum, // Obtén la cantidad de usuarios activos según tus necesidades.
      porc_iteraciones_completadas: percentageFinishedIterations.toFixed(1) + "%", // Calcula esto según tus necesidades.
      porc_estudios_completados: percentageFinishedStudies.toFixed(1) + "%" // Calcula esto según tus necesidades.
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener los datos" });
  }
};
