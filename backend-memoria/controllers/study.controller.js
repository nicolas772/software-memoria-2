const db = require("../models");
const Study = db.study;

exports.create = (req, res) => {
  // Save new Study to Database
  Study.create({
    software_name: req.body.softwareName,
    software_tipe: req.body.softwareType,
    url: req.body.softwareUrl,
    userId: req.body.testerId,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    iteration_qty: 0,
  })
    .then(() => {
      res.send({ message: "El estudio ha sido creado con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};