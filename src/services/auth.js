const config = require('../config');
const Joi = require('joi');
const UserDAO = require('../services/database/user');

const validateApiKey = api_key => {
    if (config.api_key === api_key) {
        return true;
    }
    return false;
}

const createUser = async (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(user);
    if (error) {
        return error;
    }

    const queryResult = await UserDAO.insertUser(user.name);
    if (queryResult instanceof Error) {
        return queryResult;
    }
    return queryResult.id;

}

const getUser = async (id) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });

    const { error } = schema.validate({ id });
    if (error) {
        return error;
    }

    return await UserDAO.getUser(id);
}

const getUserByName = async (name) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({ name });
    if (error) {
        return error;
    }

    return await UserDAO.getUserByName(name);
}

const getUsers = async () => {
    return await UserDAO.getUsers();
}

const deleteUser = async (id) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });

    const { error } = schema.validate({ id });
    if (error) {
        return error;
    }

    return await UserDAO.deleteUser(id);
}

module.exports = {
    validateApiKey,
    createUser,
    getUser,
    getUsers,
    getUserByName,
    deleteUser,
}