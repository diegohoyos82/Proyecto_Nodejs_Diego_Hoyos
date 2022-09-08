'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');
var MaestrosController = require('../controllers/maestros');
var UsuariosController = require('../controllers/usuarios');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get("/", WelcomeController.welcome);
api.get("/alumnos", userProtectUrl, AlumnosController.alumnos);
api.get("/alumno/:n_lista", userProtectUrl, AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista", userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", userProtectUrl, AlumnosController.delete_alumno);

api.post("/login",[
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);


/*************** MAESTROS ***************/

api.get("/maestros", userProtectUrl, MaestrosController.maestros);
api.get("/maestro/:id_doc", userProtectUrl, MaestrosController.maestro);
api.post("/maestro", userProtectUrl, [
    body('id_doc').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('materia').not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:id_doc", userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('materia').not().isEmpty()
], MaestrosController.update_maestro);

api.delete("/maestro/:id_doc", userProtectUrl, MaestrosController.delete_maestro);

/*************** USUARIO ***************/

api.post("/usuario", userProtectUrl, [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
], UsuariosController.crear_usuario);

/*api.get("/alumnos", WelcomeController.alumnos);
api.get("/alumno", WelcomeController.alumno);
api.post("/alumno", WelcomeController.create_alumno);
api.put("/alumno", WelcomeController.update_alumno);

api.delete("/alumno", (req, res) => {
    res.send("Eliminamos un alumno");
});*/

module.exports = api;