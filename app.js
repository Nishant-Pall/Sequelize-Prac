const express = require("express");
const { sequelize, User } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
	const { name, email, role } = req.body;
	try {
		const user = await User.create({ name, email, role });
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

app.listen({ port: 5000 }, async () => {
	console.log(`server listening to 5000`);
	// looks at model and creates db
	await sequelize.authenticate({ force: true });
	console.log('Database Connected');
});

// function that creates tables according to the models we have
// if table exists, it doesnt change anything, so we need to pass
// some params to sync
// {force:true}, drops existing tables
// {alter:true}, creates another table
// async function main() {
// 	await sequelize.sync({ force: true });
// }

// main();