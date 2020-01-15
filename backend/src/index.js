const express = require('express');
const mongoose = require('mongoose');
//importação das rotas
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://lucascust:060789aA@cluster0-gnsrp.mongodb.net/omnistack10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes)


app.listen(3333);

