import express from "express";
import fs from "fs";

const PORT = 3000;
const PATH = "./users.json";
const app = express();
const BASE_URL = "/api/user";

app.use(express.json());

app.get("/api/users/", (req, res) => {
	res.send(getUsers());
});

app.get(BASE_URL + "/:id", (req, res) => {
	res.send(getUserById(req.params.id));
});

app.post(BASE_URL, (req, res) => {
	const user = req.body;

	let savedUser = saveNewUser(user);

	res.send(savedUser);
	res.end();
});

app.put(BASE_URL + "/:id", (req, res) => {
	const id = req.params.id;
	const users = getUsers();
	const indexUser = users.findIndex((user) => user._id === id);

	if (indexUser === -1) {
		res.send("El usuario no existe");
		res.end();
	}

	users[indexUser] = {
		...users[indexUser],
		...req.body,
	};

	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
	res.end();
});

app.listen(PORT, () => {
	console.log("Express encendido.");
});

const getUsers = () => {
	return JSON.parse(fs.readFileSync(PATH, "utf-8"));
};

const getUserById = (id) => {
	const users = getUsers();
	return users.find((user) => user._id === id);
};

const saveNewUser = (user) => {
	const users = getUsers();
	users.push(user);
	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
	return user;
};

const updateUser = (id, user) => {
	const newUser = {
		_id: id,
		...user,
	};
};
