const mongoose = require('mongoose');

// This is the schema format that mongoose will receive for todos
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Have to convert to model
const Todo = mongoose.model('Todo', todoSchema);

// Export Todo model
module.exports = Todo;