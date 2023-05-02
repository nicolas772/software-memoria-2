const controller = require("../controllers/iteration.controller");
//const { authJwt } = require("../middleware");

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
  
  /*app.get(
    "/api/test/studies",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getStudies
  );

  app.get(
    "/api/test/study",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getStudy
  );*/
};