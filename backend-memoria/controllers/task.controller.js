const db = require("../models");
const Task = db.task;

exports.create = (req, res) => {
  // Save new Study to Database
  Task.create({
    title: req.body.titulo,
    description: req.body.descripcion,
    dificulty: req.body.dificulty,
    minutes_optimal: req.body.minutes,
    seconds_optimal: req.body.seconds,
    iterationId: req.body.iditeration,
  })
    .then(() => {
      res.send({ message: "La tarea ha sido creada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

/*exports.getIterations = (req, res) => {
  const studyId= req.query.idStudy;
  Iteration.findAll({
    where:{
      studyId: studyId,
    }
  })
  .then(iterations => {
    res.status(200).json(iterations); // Enviar una respuesta JSON con los estudios encontrados
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  });
};*/