const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const iterationstate_controller = require("../controllers/iterationstate.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/tester",
    [authJwt.verifyToken, authJwt.isTester],
    controller.testerBoard
  );

  app.get(
    "/api/test/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );

  app.get(
    "/api/test/next-task",
    [authJwt.verifyToken, authJwt.isUser],
    iterationstate_controller.getNextTaskForStudy
  );
};