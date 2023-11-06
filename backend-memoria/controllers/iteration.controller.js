const db = require("../models");
const Iteration = db.iteration;
const Study = db.study;
const Task = db.task

exports.create = (req, res) => {
  // Save new Study to Database
  Iteration.create({
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    goal: req.body.objetivo,
    studyId: req.body.idstudy,
  })
    .then(() => {
      res.send({ message: "La iteración ha sido creada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateIteration = (req, res) => {
  // Save new Study to Database
  Iteration.update({
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    goal: req.body.objetivo,
  },
    { where: { id: req.body.iditeration } }
  )
    .then(() => {
      res.send({ message: "La iteracion ha sido modificada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getIterations = (req, res) => {
  const studyId= req.query.idStudy;
  Iteration.findAll({
    where:{
      studyId: studyId,
    }
  })
  .then(iterations => {
    res.status(200).json(iterations); // Enviar una respuesta JSON con los estudios encontrados
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  });
};

exports.getIteration = (req, res) => {
  const iterationId= req.query.idIteration; // Obtener el valor de la cabecera user-id
  Iteration.findOne({
    where:{
      id: iterationId
    }
  })
  .then(iteration => {
    console.log(iteration.studyId)
    res.status(200).json(iteration)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
  })
};

exports.getIterationWithDataStudy = async (req, res) => {
  try {
    const iterationId = req.query.idIteration;
    const iteration = await Iteration.findOne({ where: { id: iterationId } });
    const studyId = iteration.studyId;
    const study = await Study.findByPk(studyId);
    
    const responseData = {
      iteration: iteration,
      study: study
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
};


exports.deleteIteration2 = (req, res) => {
  const studyId = req.query.idStudy
  const iterationId = req.query.idIteration
  //eliminar tareas de la iteracion
  Task.destroy({
    where: {
      iterationId: iterationId
    }
  })
    .then(async (iteration) => {
      //disminuir iteration qty
      const study = await Study.findByPk(studyId)
      study.iteration_qty -= 1
      await study.save()

      //eliminar iteracion
      await Iteration.destroy({
        where: {
          id: iterationId
        }
      })
      res.status(200).json(iteration)
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
    })
}

/*exports.deleteIteration = (req, res) => {
  const studyId = req.query.idStudy
  const iterationId = req.query.idIteration
  //eliminar tareas de la iteracion
  Iteration.destroy({
    where: {
      id: iterationId
    }
  })
    .then(async (iteration) => {
      //disminuir iteration qty
      const study = await Study.findByPk(studyId)
      study.iteration_qty -= 1
      study.active_iteration_qty -= 1; //solo si el estado de la iteracion que estoy eliminando es "Activa"
      await study.save()
      res.status(200).json(iteration)
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error si ocurre algún problema en la consulta
    })
}*/

exports.deleteIteration = (req, res) => {
  const studyId = req.query.idStudy
  const iterationId = req.query.idIteration

  Iteration.findByPk(iterationId)
    .then(async (iteration) => {
      if (!iteration) {
        return res.status(404).send({ message: "Iteración no encontrada." });
      }

      const iterationState = iteration.state;

      iteration.destroy()
        .then(async () => {
          const study = await Study.findByPk(studyId);

          if (iterationState === "Activa") {
            study.active_iteration_qty -= 1;
          }
          study.iteration_qty -= 1
          await study.save();
          res.send({ message: "La iteración ha sido eliminada con éxito!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.setStateIteration = (req, res) => {
  const studyId = req.body.idStudy
  const newState = req.body.state;
  Iteration.update({
    state: newState,
  },
    { where: { id: req.body.iditeration } }
  )
    .then(async () => {
      const study = await Study.findByPk(studyId)
      if (newState === "Finalizada") {
        study.active_iteration_qty -= 1;
      } else if (newState === "Activa") {
        study.active_iteration_qty += 1;
      }
      await study.save()
      res.send({ message: "La iteracion ha sido modificada con éxito!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
