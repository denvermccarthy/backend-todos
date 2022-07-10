const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
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
module.exports = router;
