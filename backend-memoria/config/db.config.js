module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "posgres",
    DB: "software-memoria-2",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };