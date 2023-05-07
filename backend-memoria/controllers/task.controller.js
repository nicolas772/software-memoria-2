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

exports.updateTask = (req, res) => {
  // Save new Study to Database
  Task.update({
    title: req.body.titulo,
    description: req.body.descripcion,
    dificulty: req.body.dificulty,
    minutes_optimal: req.body.minutes,
    seconds_optimal: req.body.seconds,
  },
  { where: { id: req.body.idtask } } 
  )
    .then(() => {
      res.send({ message: "La tarea ha sido modificada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getTasks = (req, res) => {
  const iterationId= req.query.idIteration;
  Task.findAll({
    where:{
      iterationId: iterationId,
    }
  })
  .then(tasks => {
    res.status(200).json(tasks); // Enviar una respuesta JSON con los estudios encontrados
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  });
};

exports.getTask = (req, res) => {
  const taskId= req.query.idTask; // Obtener el valor de la cabecera user-id
  Task.findOne({
    where:{
      id: taskId
    }
  })
  .then(task => {
    res.status(200).json(task)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  })
};