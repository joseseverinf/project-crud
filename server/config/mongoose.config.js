const mongoose = require('mongoose');

mongoose.pluralize(null);

mongoose.connect('mongodb://localhost/lospiratas')
.then( () => console.log('Conectado a la BD'))
.catch( err => console.errror('Error al conectar con la BD', err));

