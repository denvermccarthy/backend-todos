const { Router } = require('express');
const UserService = require('../services/UserService');
const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.post('/session', async (req, res, next) => {
  try {
    const user = await UserService.signIn(req.body);
    res.json({ message: 'Successfully signed in' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
