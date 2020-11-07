const config = require('../config');
const Joi = require('joi');
const { insertUser, deleteUser, getUser } = require('../services/database/user');

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

    const queryResult = await insertUser(user.name);
    if (queryResult instanceof Error) {
        return queryResult;
    }
    return queryResult.id;

}

module.exports = { validateApiKey, createUser }