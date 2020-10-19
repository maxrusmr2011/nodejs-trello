const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const boardOne = await boardService.getOne(req.params.id);
    res.json(boardOne);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardService.delOne(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const boardOne = await boardService.updateOne(req.params.id, req.body);
    res.json(boardOne);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardOne = await boardService.createOne(req.body);
    res.json(boardOne);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
