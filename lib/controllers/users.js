const { Router } = require('express');
const UserService = require('../services/UserService');
const router = Router();
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

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
    const token = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: IS_DEPLOYED,
        sameSite: IS_DEPLOYED ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .json({ message: 'Successfully signed in' });
  } catch (e) {
    next(e);
  }
});
router.delete('/session', async (req, res, next) => {
  try {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        secure: IS_DEPLOYED,
        sameSite: IS_DEPLOYED ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
