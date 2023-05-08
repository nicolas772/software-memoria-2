const controller = require("../controllers/task.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/task/create",
  controller.create);

  app.put("/api/task/update",
  controller.updateTask);

  app.delete("/api/task/delete",
  controller.deleteTask);
  
  app.get(
    "/api/test/tasks",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getTasks
  );

  app.get(
    "/api/test/task",
    [authJwt.verifyToken, authJwt.isTester],
    controller.getTask
  );
};