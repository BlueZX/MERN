require('./config/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(cors());

//Configuracion global de rutas
app.use(require('./routes'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/libros', (err, res) => {
    if (err) throw err;

    console.log('Base de datos online');
});


app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto ', process.env.PORT);
}
);