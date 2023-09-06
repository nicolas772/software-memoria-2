const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.testerBoard = (req, res) => {
  res.status(200).send("Tester Content.");
};

exports.updateProfile= (req, res) => {
  User.update({
    username: req.body.username,
    email: req.body.email,
    sex: req.body.sex,
    birthday: req.body.birthday
  },
    { where: { id: req.body.idUser } }
  )
    .then(() => {
      res.send({ message: "El usuario ha sido actualizado con éxito" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};