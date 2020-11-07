const { Router, Request, Response } = require('express');
const middlewares = require('../middlewares');
const { createUser, getUser, getUsers, getUserByName } = require('../../services/auth');
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', middlewares.isAuth, async (req, res) => {
    if (req.query.name) {
      const result = await getUserByName(req.query.name);
      if (result instanceof Error) {
        if (result.isJoi) {
          res.statusCode = 400;
          res.json({ error: result.details[0].message });
          return;
        }
        // if it isn't Joi, it's Postgres
        res.statusCode = 500;
        res.send({ error: result.detail });
        return;
      }
      return res.json(result[0]).status(200);
    }
    const users = await getUsers();
    return res.json(users).status(200);
  });

  route.get('/:id', middlewares.isAuth, (req, res) => {
    return res.json({ req: "GET" }).status(200);
  });

  route.post('/', middlewares.isAuth, async (req, res) => {
    const result = await createUser(req.body);
    if (result instanceof Error) {
      if (result.isJoi) {
        res.statusCode = 400;
        res.json({ error: result.details[0].message });
        return;
      }
      // if it isn't Joi, it's Postgres
      res.statusCode = 500;
      res.send({ error: result.detail });
      return;
    }
    return res.json({ success: true, id: result });
  });

  route.delete('/', middlewares.isAuth, (req, res) => {
    return res.json({ req: "DELETE" }).status(200);
  });
};