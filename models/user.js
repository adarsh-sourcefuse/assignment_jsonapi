"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname((_a = process.mainModule) === null || _a === void 0 ? void 0 : _a.filename), 'data', 'users.json');
function pareadFile(cb) {
    fs.readFile(p, (err, fileContent) => {
        cb(JSON.parse(fileContent.toString()));
    });
}
class User {
    constructor(f, m, l, e, p, r, a, d) {
        this.id = Math.random().toString();
        this.firstName = f;
        this.lastName = l;
        this.middleName = m;
        this.email = e;
        this.phoneNumber = p;
        this.role = r;
        this.address = a;
        this.dateOfJoining = d;
    }
    save() {
        pareadFile((users) => {
            users.push(this);
            fs.writeFile(p, JSON.stringify(users), (err) => {
                console.log(err);
            });
        });
    }
    static update(param, req, cd) {
        pareadFile((users) => {
            let message = 'No Record';
            console.log(users);
            console.log(param);
            const userIndex = users.findIndex(item => item.id === param);
            if (userIndex >= 0) {
                console.log("enter");
                users[userIndex] = { id: users[userIndex].id.toString(),
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    role: req.body.role,
                    address: req.body.address,
                    dateOfJoining: req.body.dateOfJoining,
                };
                console.log(users);
                fs.writeFile(p, JSON.stringify(users), (err) => {
                    if (!err) {
                        message = "Updated";
                        console.log(message, "cdcd");
                        cd(message);
                    }
                });
            }
            else {
                cd(message);
            }
        });
    }
    static delete(param, cb) {
        console.log("cdjbchjdsb");
        pareadFile((users) => {
            let previous_length = users.length;
            users = users.filter(item => item.id !== param);
            if (users.length === previous_length) {
                console.log("nhi hai record");
                cb("No Record");
            }
            else {
                fs.writeFile(p, JSON.stringify(users), (err) => {
                    console.log(err);
                    cb("deleted");
                });
            }
        });
    }
    static fetchAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            else {
                cb(JSON.parse(fileContent.toString()));
            }
        });
    }
}
exports.User = User;
