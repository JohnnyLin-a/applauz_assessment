const { Router } = require('express');
const testAuth = require('./routes/testAuth');
const user = require('./routes/user');

module.exports = () => {
	const app = Router();
	user(app);
	testAuth(app);

	return app
}