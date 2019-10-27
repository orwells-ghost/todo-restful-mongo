const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    
const todoRoutes = require('./routes/todos');

// This allows us to parse JSON throughout our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res) {
    res.send('index.html')
});

// app.use essentially allows us to put all routes through /api/todos by default
app.use('/api/todos', todoRoutes);

app.listen(PORT, function() {
    console.log('App is running on port ' + PORT)
});