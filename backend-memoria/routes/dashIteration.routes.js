const { authJwt, verifyProfile } = require("../middleware");
const dashIteration_controller = require("../controllers/dashIteration.controller")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/dashboard/iteration/general/cards",
    [authJwt.verifyToken, authJwt.isTester],
    dashIteration_controller.cards
  );
};