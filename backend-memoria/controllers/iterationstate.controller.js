const db = require("../models");
const IterationState = db.iterationstate;
const Iteration = db.iteration
const Task = db.task

exports.getNextTaskForStudy = async (req, res) => {
  try {
    const iterationId = req.query.idIteration
    const userId = req.query.idUser
    const iterationState = await IterationState.findOne({ where: { iterationId: iterationId, userId: userId } })
    let LastTaskId, newIterationState
    if (!iterationState) {
      // Si no se encuentra, crea un nuevo registro
      newIterationState = true
      LastTaskId = await Task.min('id', {
        where: {
          iterationId: iterationId
        }
      });
      await IterationState.create({
        iterationId: iterationId,
        userId: userId,
        taskId: LastTaskId
      });
      //actualizar +1 user_qty en la iteration
      const iteration = await Iteration.findOne({ where: { id: iterationId } })
      iteration.users_qty += 1
      await iteration.save()

    } else {
      newIterationState = false
      LastTaskId = iterationState.taskId
    }

    const responseData = {
      nextTask: LastTaskId,
      newIterationState: newIterationState,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
};