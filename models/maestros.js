'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaestrosSchema = Schema({
    id_doc: { type: Number, require: true, unique: true},
    nombre: { type: String, require: true},
    apellido: { type: String, require: true},
    materia: { type: String, require: true},
});

module.exports = mongoose.model('maestros', MaestrosSchema);