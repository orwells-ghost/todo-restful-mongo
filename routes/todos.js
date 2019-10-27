const express = require('express'),
    router  = express.Router(),
    db = require('../models'); // if we include just the directory, it will automatically find index.js
    helpers = require('../helpers/todos');

// Since both get and create both use / path, we can simplfy the logic to this by using a helper file
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;