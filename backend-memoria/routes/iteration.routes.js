const controller = require("../controllers/iteration.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/iteration/create",
  controller.create);

  app.put("/api/iteration/update",
  controller.updateIteration);
  
  app.get(
    "/api/test/iterations",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getIterations
  );

  app.get(
    "/api/test/iteration",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getIteration
  );
};