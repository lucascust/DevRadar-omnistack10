
const express = require('express');
const mongoose = require('mongoose');
//importação das rotas
const routes = require('./routes');
// Extensão cors para remover bloqueio externo, permitindo usar localhost 3000 e 3333
const cors = require('cors')

const app = express();

// Connecto com o banco Mongo através da string pega pelo Mongo Atlas
mongoose.connect('mongodb+srv://lucascust:060789aA@cluster0-gnsrp.mongodb.net/omnistack10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// permite acesso de qualquer aplicação
app.use(cors());

app.use(express.json());
app.use(routes);


app.listen(3333);

