

const validateError = (result) => {
    if (result instanceof Error) {
        if (result.isJoi) {
            return { statusCode: 400, errorToSend: { error: result.details[0].message } };
        }
        // if it isn't Joi, it's Postgres
        return { statusCode: 500, errorToSend: { error: result.detail } };
    }
    return null;
}

module.exports = {
    validateError
}