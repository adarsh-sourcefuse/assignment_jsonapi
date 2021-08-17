"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
exports.getUsers = (req, res) => {
    user_1.User.fetchAll((users) => {
        res.status(200).json({ users: users });
    });
};
exports.addUser = (req, res) => {
    const newUser = new user_1.User(req.body.firstName, req.body.middleName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.role, req.body.address, req.body.dateOfJoining);
    newUser.save();
    res.status(200).json({ message: "added user" });
};
exports.updateUser = (req, res) => {
    const uid = req.params.userId;
    console.log(uid);
    user_1.User.update(uid, req, (message) => {
        return res.status(200).json({ message: message });
    });
};
exports.deleteUser = (req, res) => {
    const uid = req.params.userId;
    user_1.User.delete(uid, (message) => {
        res.status(200).json({ message: message });
    });
};
