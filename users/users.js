//TODO: CRUD de usuarios
// getAllUsers()
// getUserbyId()
// insertUser(user) <-- hashar el password utilizando la libreria bcript
// updateUser(user)  <-- user contiene todas las modificaciones y el id del user a modificar
// deleteUser(id)
// validatePassword(user, password)  <-- opcional

import fs from "fs";
import bcrypt from "bcrypt";

const PATH = "./users.json";

// 1.
const getAllUsers = () => {
	return JSON.parse(fs.readFileSync(PATH, "utf-8"));
};

// console.log(getAllUsers());

// 2.
const getUserById = (id) => {
	const allUsers = getAllUsers();
	const user = allUsers.find((user) => user._id == id);

	if (!user) {
		throw new Error("User not found");
	}

	return user;
};

// console.log(getUserById("59b99dc0cfa9a34dcd7885cf"));

// 4.
const updateUser = (user) => {
	const users = getAllUsers();
	const userIndex = users.findIndex((u) => u._id === user._id);

	if (userIndex === -1) {
		throw new Error("User not found");
	}

	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;

	users[userIndex] = { ...users[userIndex], ...user };
	return users[userIndex];
};

// console.log(
// 	updateUser({
// 		_id: "59b99dc0cfa9a34dcd7885cf",
// 		name: "Juanito",
// 		email: "juanito_el_mejor@gmail.com",
// 		password: "Password1!",
// 	})
// );

// 3.
const insertUser = (user) => {
	const users = getAllUsers();
	const existingUserIdx = users.findIndex((u) => u._id === user._id);

	if (existingUserIdx != -1) {
		throw new Error("User already exists, try updating it.");
	}
	user.password = bcrypt.hashSync(user.password, 10);

	users.push(user);
	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));

	return user;
};

// console.log(
// 	insertUser({
// 		_id: "jouaehgoae8u1n",
// 		name: "Martín Diaz",
// 		email: "prueba@gmail.com",
// 		password: "123",
// 	})
// );

// 5.
const deleteUser = (_id) => {
	const users = getAllUsers();
	const userToDeleteIdx = users.findIndex((u) => u._id === _id);

	if (userToDeleteIdx === -1) {
		throw new Error("User does not exist");
	}

	users.splice(userToDeleteIdx, 1);
	fs.writeFileSync(PATH, JSON.stringify(users, null, 2));
	return users;
};

// console.log(deleteUser("ksxwigysk4qb5fgomub"));

// 6.
const validatePassword = (userInput, dbPassword) => {
	return bcrypt.compareSync(userInput, dbPassword);
};

// console.log(
// 	validatePassword(
// 		"123",
// 		"$2b$10$Stgg39rtzFSRAv1o8UtiQevPEvLZASkYR5tKRpvIfA.uBuRrjjRcW"
// 	)
// );
