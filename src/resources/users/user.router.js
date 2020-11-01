const router = require('express').Router();
const User = require('./user.mongodb.model');
const usersService = require('./user.service');
const { catchErr } = require('../../middleware/handleError');
const validate = require('../../middleware/validate');
const { keysEtalon } = require('../../constants');
const bcrypt = require('bcrypt');
const { NOT_FOUND } = require('../../utils/errors');

router
  .route('/')
  .get(
    catchErr(async (req, res) => {
      console.log('now', req.user, req.isAuthenticated());
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    validate(keysEtalon.user),
    catchErr(async (req, res) => {
      const password = await bcrypt.hash(req.body.password, 10);
      console.log('hash=', password);
      const body = { ...req.body, password };
      const one = await usersService.createOne(body);
      res.status(200).json(User.toResponse(one));
    })
  );

router
  .route('/:id')
  .get(
    catchErr(async (req, res, next) => {
      const one = await usersService.getOne(req.params.id);
      // if (!one) throw Error('404User');
      if (!one) return next(NOT_FOUND.text('User'));
      res.status(200).json(User.toResponse(one));
    })
  )
  .delete(
    catchErr(async (req, res, next) => {
      const one = await usersService.delOne(req.params.id);
      if (!one) return next(NOT_FOUND.text('User'));
      res.status(200).send('The user has been deleted');
    })
  )
  .put(
    validate(keysEtalon.user),
    catchErr(async (req, res) => {
      const body = { ...req.body, id: req.params.id };
      if ('password' in body) {
        body.password = await bcrypt.hash(body.password, 10);
        console.log('hash=', body.password);
      }
      const one = await usersService.updateOne(req.params.id, body);
      res.status(200).json(User.toResponse(one));
    })
  );

module.exports = router;
