const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Todo = require('../models/Todo');

const router = Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const resp = await Todo.insertTodo({ ...req.body, userId: req.user.id });
    res.json(resp);
  } catch (e) {
    next(e);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const resp = await Todo.getAll(req.user);
    res.json(resp);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', [authenticate, authorize], async (req, res, next) => {
  try {
    const resp = await Todo.updateById(req.params.id, req.body, req.user.id);
    res.json(resp);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', [authenticate, authorize], async (req, res, next) => {
  try {
    const resp = await Todo.deleteById(req.params.id);
    res.json(resp);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
