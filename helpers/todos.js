const db = require('../models');

// // Here we are defining are routes. This is what should happen when GET route is hit: list all todos in json
exports.getTodos = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.send(err);
        });
};

// When a post request is made, the request body will be sent to Todo schema model and added to db. req.body is what is passed in the url when post req is made
exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.status(201).json(newTodo);
        })
        .catch(function (err) {
            res.send(err);
        });
};

// : says match anything after. req.params are the url parameters.
exports.getTodo = function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (err) {
            res.send(err);
        });
};

// This will update an existing todo. new: true will respond with the update version, rather than the older version
exports.updateTodo = function (req, res) {
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
        .then(function (todo) {
            res.json(todo)
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.deleteTodo = function (req, res) {
    db.Todo.remove({ _id: req.params.todoId })
        .then(function () {
            res.json({ message: 'Todo deleted' })
        })
        .catch(function (err) {
            res.send(err);
        });
};

module.exports = exports;