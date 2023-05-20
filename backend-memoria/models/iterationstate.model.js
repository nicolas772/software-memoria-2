module.exports = (sequelize, Sequelize) => {
  const IterationState = sequelize.define("iterationstates", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  });

  return IterationState;
};