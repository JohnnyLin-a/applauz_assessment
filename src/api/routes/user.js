const { Router, Request, Response } = require('express');
const middlewares = require('../middlewares');
const { createUser, getUser, getUsers, getUserByName, deleteUser } = require('../../services/auth');
const { validateError } = require('../../helpers/api/routes/userHelper');
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', middlewares.isAuth, async (req, res) => {
    if (req.query.name) {
      // With query string
      const result = await getUserByName(req.query.name);
      const error = validateError(result);
      if (error) {
        res.statusCode = error.statusCode;
        res.json(error.errorToSend);
      }
      if (result.length === 0) {
        res.statusCode = 404;
        res.send({ error: "User not found" });
        return;
      }
      return res.json(result[0]).status(200);
    }
    // No query string
    const users = await getUsers();
    const error = validateError(result);
    if (error) {
      res.statusCode = error.statusCode;
      res.json(error.errorToSend);
    }
    if (users.length === 0) {
      // 404 here, otherwise if empty array is returned,
      // the end user can think that the app might not be working.
      res.statusCode = 404;
      res.send({ error: "No registered user" });
      return;
    }
    return res.json(users).status(200);
  });

  route.get('/:id(\\d+)', middlewares.isAuth, async (req, res) => {
    const result = await getUser(parseInt(req.params.id));
    const error = validateError(result);
    if (error) {
      res.statusCode = error.statusCode;
      res.json(error.errorToSend);
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
    const error = validateError(result);
    if (error) {
      res.statusCode = error.statusCode;
      res.json(error.errorToSend);
    }
    return res.json({ success: true, id: result });
  });

  route.delete('/', middlewares.isAuth, async (req, res) => {
    const result = await deleteUser(req.body.id);
    const error = validateError(result);
    if (error) {
      res.statusCode = error.statusCode;
      res.json(error.errorToSend);
    }
    if (result === false) {
      res.statusCode = 404;
      res.send({ error: "User not found" });
      return;
    }
    return res.json({ success: result }).status(200);
  });
};