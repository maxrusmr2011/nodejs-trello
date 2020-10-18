const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  console.log('ok1');
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  console.log('ok1');
  try {
    const userOne = await usersService.getOne(req.params.id);
    res.json(User.toResponse(userOne));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
