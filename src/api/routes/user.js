const { Router, Request, Response } = require('express');
const middlewares = require('../middlewares');
const { createUser, getUser, getUsers, getUserByName, deleteUser } = require('../../services/auth');
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
      if (result.length === 0) {
        res.statusCode = 404;
        res.send({ error: "User not found" });
        return;
      }
      return res.json(result[0]).status(200);
    }
    const users = await getUsers();
    if (users.length === 0) {
      res.statusCode = 404;
      res.send({ error: "No users" });
      return;
    }
    return res.json(users).status(200);
  });

  route.get('/:id(\\d+)', middlewares.isAuth, async (req, res) => {
    const result = await getUser(parseInt(req.params.id));
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
    if (result === null) {
      res.statusCode = 404;
      res.send({ error: "User not found" });
      return;
    }
    return res.json(result).status(200);
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

  route.delete('/', middlewares.isAuth, async (req, res) => {
    const result = await deleteUser(req.body.id);
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
    if (result === false) {
      res.statusCode = 404;
      res.send({ error: "User not found" });
      return;
    }
    return res.json({ success: result }).status(200);
  });
};