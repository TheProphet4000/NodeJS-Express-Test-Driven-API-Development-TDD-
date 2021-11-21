var express = require('express');
var router = express.Router();
var createError = require("http-errors");
const todos = [{ id: 1, name: "hej", completed: false }];

router.get('/', function (req, res, next) {
    res.json(todos);
});

router.get("/:id", function (req, res, next) {
    const todo = todos.find(todo => todo.id == Number(req.params.id));

    if (!foundTodo) {
        return next(createError(404, "not found"));
    }

    res.json(foundTodo);
});

router.post("/", function (req, res, next) {
    const { body } = req;

    if (typeof body.name != "string") {
        return next(createError(422, "validation error"));
    }

    const newTodo = {
        id: todos.length + 1, name: body.name,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

module.exports = router;