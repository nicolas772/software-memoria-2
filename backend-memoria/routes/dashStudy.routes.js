const { authJwt, verifyProfile } = require("../middleware");
const dashStudy_controller = require("../controllers/dashStudy.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/dashboard/study/general/cards",
    [authJwt.verifyToken, authJwt.isTester],
    dashStudy_controller.cards
  );
  app.get(
    "/api/dashboard/study/general/bar-list",
    [authJwt.verifyToken, authJwt.isTester],
    dashStudy_controller.barList
  );
  app.get(
    "/api/dashboard/study/general/bar-chart",
    [authJwt.verifyToken, authJwt.isTester],
    dashStudy_controller.barChart
  );
  app.get(
    "/api/dashboard/study/general/table-time",
    [authJwt.verifyToken, authJwt.isTester],
    dashStudy_controller.tableTime
  );
};