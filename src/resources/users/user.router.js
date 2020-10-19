const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const userOne = await usersService.getOne(req.params.id);
    res.json(User.toResponse(userOne));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.delOne(req.params.id);
    res.status(200).end();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const userOne = await usersService.updateOne(req.params.id, req.body);
    res.json(User.toResponse(userOne));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const userOne = await usersService.createOne(req.body);
    res.json(User.toResponse(userOne));
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = router;
