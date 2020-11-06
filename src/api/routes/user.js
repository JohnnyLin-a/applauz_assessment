const { Router, Request, Response } = require('express');
const middlewares = require('../middlewares')
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.post('/me', middlewares.isAuth, (req, res) => {
    return res.json({ user: req.body.currentUser }).status(200);
  });
};