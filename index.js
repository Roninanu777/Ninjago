const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//St up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialize routes
app.use('/api',routes);

//error handling middleware
app.use(( err, req, res, next ) => {
    res.status(422).send({error: err.message});
});

//Listen for request
const PORT = process.env.port || 3000; 
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})