const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErr } = require('../../middleware/handleError');
const validate = require('../../middleware/validate');
const { keysEtalon } = require('../../constants');

router
  .route('/')
  .get(
    catchErr(async (req, res) => {
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    validate(keysEtalon.user),
    catchErr(async (req, res) => {
      const one = await usersService.createOne(req.body);
      res.status(200).json(User.toResponse(one));
    })
  );

router
  .route('/:id')
  .get(
    catchErr(async (req, res) => {
      const one = await usersService.getOne(req.params.id);
      if (!one) throw Error('404User');
      res.status(200).json(User.toResponse(one));
    })
  )
  .delete(
    catchErr(async (req, res) => {
      const one = await usersService.delOne(req.params.id);
      if (!one) throw Error('404User');
      res.status(200).send('The user has been deleted');
    })
  )
  .put(
    validate(keysEtalon.user),
    catchErr(async (req, res) => {
      const body = { ...req.body, id: req.params.id };
      const one = await usersService.updateOne(req.params.id, body);
      res.status(200).json(User.toResponse(one));
    })
  );

module.exports = router;
