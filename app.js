const express = require('express');
const { sequelize, user } = require('./models');

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
	const { name, email, role } = req.body;

	try {
		const postUser = await user.create({ name, email, role });
		return res.json(postUser);
	} catch (err) {
		console.error(err);
	}
});


app.listen({ port: 5000 }, async () => {
	await sequelize.authenticate({ force: true });
	console.log('Database connected');
});