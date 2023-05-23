module.exports = (sequelize, Sequelize) => {
  const IterationState = sequelize.define("iterationstates", {
    state: {//En progreso - Finalizada
      type: Sequelize.STRING,
      defaultValue: "En progreso",
    }
  });

  return IterationState;
};