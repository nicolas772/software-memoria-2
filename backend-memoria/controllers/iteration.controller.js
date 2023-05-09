const db = require("../models");
const Iteration = db.iteration;

exports.create = (req, res) => {
  // Save new Study to Database
  Iteration.create({
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    goal: req.body.objetivo,
    studyId: req.body.idstudy,
  })
    .then(() => {
      res.send({ message: "La iteración ha sido creada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateIteration = (req, res) => {
  // Save new Study to Database
  Iteration.update({
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    goal: req.body.objetivo,
  },
    { where: { id: req.body.iditeration } }
  )
    .then(() => {
      res.send({ message: "La iteracion ha sido modificada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getIterations = (req, res) => {
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
};

exports.getIteration = (req, res) => {
  const iterationId= req.query.idIteration; // Obtener el valor de la cabecera user-id
  Iteration.findOne({
    where:{
      id: iterationId
    }
  })
  .then(iteration => {
    res.status(200).json(iteration)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  })
};