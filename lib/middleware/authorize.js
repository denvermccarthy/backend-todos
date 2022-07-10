const Todo = require('../models/Todo');

module.exports = async (req, res, next) => {
  try {
    const todo = await Todo.getById({ id: req.params.id, userId: req.user.id });
    if (todo.userId !== req.user.id) {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
