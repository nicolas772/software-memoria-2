const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.study = require("../models/study.model.js")(sequelize, Sequelize);
db.iteration = require("../models/iteration.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasMany(db.study, {
  foreignKey: 'userId'
});

db.study.belongsTo(db.user);

db.study.hasMany(db.iteration, {
  foreignKey: 'studyId'
});

db.iteration.belongsTo(db.study);

db.iteration.afterCreate(async (iteration, options) => {
  const study = await db.study.findByPk(iteration.studyId)
  study.iteration_qty += 1
  iteration.iteration_number = study.iteration_qty
  await iteration.save()
  await study.save()
})

db.iteration.hasMany(db.task, {
  foreignKey: 'iterationId'
});

db.task.belongsTo(db.iteration);

db.task.afterCreate(async (task, options) => {
  const iteration = await db.iteration.findByPk(task.iterationId)
  iteration.task_qty += 1
  await iteration.save()
})

db.ROLES = ["user", "tester"];

module.exports = db;