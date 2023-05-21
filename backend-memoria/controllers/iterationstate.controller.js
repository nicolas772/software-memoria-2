const db = require("../models");
const IterationState = db.iterationstate;
const Task = db.task

exports.getNextTaskForStudy = async (req, res) => {
  try {
    const iterationId = req.query.idIteration
    const userId = req.query.idUser
    const iterationState = await IterationState.findOne({ where: { iterationId: iterationId, userId: userId } })
    let LastTaskId = 1000000
    if (!iterationState) {
      // Si no se encuentra, crea un nuevo registro
      LastTaskId = await Task.min('id', {
        where: {
          iterationId: iterationId
        }
      });
      const iterationState2 = await IterationState.create({
        iterationId: iterationId,
        userId: userId,
        taskId: LastTaskId
      });
      //se debe actualizar +1 user_qty en la iteration
    }else {
      LastTaskId = iterationState.taskId
    }

    const responseData = {
      nextTask: LastTaskId
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
};

/*const iteration = await Iteration.findOne({ where: { id: iterationId } });
    const studyId = iteration.studyId;
    const study = await Study.findByPk(studyId);*/