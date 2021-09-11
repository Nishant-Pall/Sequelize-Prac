const express = require("express");
const { sequelize, User, Post } = require('./models');

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

app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();

		return res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
});


app.get('/users/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const user = await User.findOne({
			where: { uuid }
		});
		return res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.post('/posts', async (req, res) => {
	const { userUuid, body } = req.body;

	try {
		const user = await User.findOne({
			where: {
				uuid: userUuid
			}
		});
		const post = await Post.create({
			body: body,
			userId: user.id
		});
		return res.json(post);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
});


app.get('/posts', async (req, res) => {
	try {
		// will return all posts with the user model as well
		// show User as user
		const post = await Post.findAll({ include: [{ model: User, as: 'user' }] });
		return res.json(post);
	} catch (err) {
		console.error(err);
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