const controller = require("../controllers/study.controller");
const { verifyStudy } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/study/create", [verifyStudy.checkDuplicateStudyName], controller.create);
};