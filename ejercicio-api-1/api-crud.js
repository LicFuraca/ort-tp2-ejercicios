// CRUD SERVIDOR WEB
// TODO Hacer un servidor web con express, que tenga los siguientes endpoints
// get: /api/users --> devolver a todos los usuarios del archivo users.json
// get: /api/user/_id --> devolver el usuario cuyo id es _id
// post: /api/user/ --> dar alta un usuario en el archivo json

// faltó:
// update: /api/user/_id --> actualizar el usuario con id _id en el archivo json
// delete: /api/user/_id --> eliminar usuario con id _id en el archivo json

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
	const indexUser = getIndexUserById(id, users);

	if (indexUser === -1) {
		res.send("El usuario no existe");
		res.end();
	}

	updateUser(indexUser);
	res.send("Usuario actualizado", users[indexUser]);
	res.end();
});

app.delete(BASE_URL + "/:id", (req, res) => {
	const id = req.params.id;
	const users = getUsers();
	const index = getIndexUserById(id, users);

	if (index === -1) {
		res.send("El usuario no existe.");
	}

	deleteUser(index);
	res.send("Usuario con id " + id + "eliminado.");
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

const getIndexUserById = (id, users) => {
	return users.findIndex((user) => user._id === id);
};

const saveNewUser = (user) => {
	const users = getUsers();
	users.push(user);
	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
	return user;
};

const updateUser = (indexUser) => {
	users[indexUser] = {
		...users[indexUser],
		...req.body,
	};

	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
};

const deleteUser = (index) => {
	const users = getUsers();
	users.splice(index, 1);
	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
};
