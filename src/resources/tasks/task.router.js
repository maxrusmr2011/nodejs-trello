const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const taskOne = await taskService.getOne(
      req.params.taskId,
      req.params.boardId
    );
    res.json(taskOne);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await taskService.delOne(req.params.taskId, req.params.boardId);
    res.status(204).end();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  try {
    const { boardId, id } = req.params;
    const body = { ...req.body, boardId };
    const taskOne = await taskService.updateOne(id, boardId, body);
    res.json(Task.toResponse(taskOne));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  try {
    const { boardId } = req.params;
    const body = { ...req.body, boardId };
    const taskOne = await taskService.createOne(boardId, body);
    res.json(taskOne);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = router;
