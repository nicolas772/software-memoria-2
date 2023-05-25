const db = require("../models");
const InfoTask = db.infotask;

exports.create = (req, res) => {
  // Save new Study to Database
  InfoTask.create({
    complete: req.body.complete,
    duration: req.body.duration,
    userId: req.body.iduser,
    taskId: req.body.idtask,
    iterationId: req.body.iditeration
  })
    .then(() => {
      res.send({ message: "La informacion de la tarea ha sido creada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};