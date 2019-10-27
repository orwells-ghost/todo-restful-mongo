const mongoose = require('mongoose');
// allows us to see changes
mongoose.set('debug', true);
// db in on localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo-restful-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');