const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { catchErr } = require('../../middleware/handleError');
const validate = require('../../middleware/validate');
const { keysEtalon } = require('../../constants');

router
  .route('/')
  .get(
    catchErr(async (req, res) => {
      // const tasks = await taskService.getByBoard(req.params.boardId);
      const tasks = await taskService.getAll();
      res.status(200).json(tasks);
    })
  )
  .post(
    validate(keysEtalon.task),
    catchErr(async (req, res) => {
      const { boardId } = req.params;
      const body = { ...req.body, boardId };
      const one = await taskService.createOne(body);
      res.status(200).json(one);
    })
  );

router
  .route('/:id')
  .get(
    catchErr(async (req, res) => {
      const { id } = req.params;
      const one = await taskService.getOne(id);
      if (!one) throw Error('404Task');
      res.status(200).json(one);
    })
  )
  .delete(
    catchErr(async (req, res) => {
      const { id } = req.params;
      const one = await taskService.delOne(id);
      if (!one) throw Error('404Task');
      res.status(200).send('The task has been deleted');
    })
  )
  .put(
    validate(keysEtalon.task),
    catchErr(async (req, res) => {
      const { boardId, id } = req.params;
      const body = { ...req.body, id, boardId };
      const taskOne = await taskService.updateOne(id, body);
      res.status(200).json(Task.toResponse(taskOne));
    })
  );

module.exports = router;
