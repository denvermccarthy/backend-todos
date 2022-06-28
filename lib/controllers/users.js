const { Router } = require('express');
const UserService = require('../services/UserService');
const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
