const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isTester = (req, res, next) => { //isAdmin ahora es isTester
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "tester") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Tester Role!"
      });
      return;
    });
  });
};

isTestingUser = (req, res, next) => { //isModerator ahora es isTestingUser
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "testingUser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Testing User Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isTester: isTester,
  isTestingUser: isTestingUser
};
module.exports = authJwt;