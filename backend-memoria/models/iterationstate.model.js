module.exports = (sequelize, Sequelize) => {
  const IterationState = sequelize.define("iterationstates", {
    inTask: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    inCSUQ: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    inQuestion: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  });

  return IterationState;
};