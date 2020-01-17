const express = require('express');
const mongoose = require('mongoose');
//importação das rotas
const routes = require('./routes');

const app = express();

// Connecto com o banco Mongo através da string pega pelo Mongo Atlas
mongoose.connect('mongodb+srv://lucascust:060789aA@cluster0-gnsrp.mongodb.net/omnistack10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use(routes);


app.listen(3333);

