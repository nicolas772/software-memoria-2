module.exports = (sequelize, Sequelize) => {
  const IterationState = sequelize.define("iterationstates", {});

  return IterationState;
};