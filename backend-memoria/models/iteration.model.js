module.exports = (sequelize, Sequelize) => {
  const Iteration = sequelize.define("iterations", {
    state: {//En progreso - Finalizada
      type: Sequelize.STRING
    },
    iteration_number: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    },
    task_qty: {
      type: Sequelize.INTEGER,
    },
    users_qty: {
      type: Sequelize.INTEGER,
    }
  });

  return Iteration;
};