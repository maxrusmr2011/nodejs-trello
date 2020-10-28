const router = require('express').Router();
const boardService = require('./board.service');
const { Board } = require('./board.mongodb.model');
const taskRouter = require('../tasks/task.router');
const { catchErr } = require('../../middleware/handleError');
const validate = require('../../middleware/validate');
const { keysEtalon } = require('../../constants');

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

router
  .route('/')
  .get(
    catchErr(async (req, res) => {
      const boards = await boardService.getAll();
      res.status(200).json(boards.map(Board.toResponse));
    })
  )
  .post(
    validate(keysEtalon.board),
    catchErr(async (req, res) => {
      const boardOne = await boardService.createOne(req.body);
      res.status(200).json(Board.toResponse(boardOne));
    })
  );

router
  .route('/:id')
  .get(
    catchErr(async (req, res) => {
      const one = await boardService.getOne(req.params.id);
      if (!one) throw Error('404Board');
      res.status(200).json(Board.toResponse(one));
    })
  )
  .delete(
    catchErr(async (req, res) => {
      const one = await boardService.delOne(req.params.id);
      if (!one) throw Error('404Board');
      res.status(200).send('The board has been deleted');
    })
  )
  .put(
    validate(keysEtalon.board),
    catchErr(async (req, res) => {
      const body = { ...req.body, id: req.params.id };
      const one = await boardService.updateOne(req.params.id, body);
      res.status(200).json(Board.toResponse(one));
    })
  );

module.exports = router;
