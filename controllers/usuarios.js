'use strict'

const { validationResult } = require('express-validator');

var Usuario = require('../models/usuarios');

var controller = {
   
    crear_usuario: function(req, res){

        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;


        Usuario.findOne({mail: user_info.mail}).exec( (err, usuario) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(usuario) return res.status(200).json({status: 200,mensaje: "El usuario ya existe."});
        
            let usuario_model = new Usuario();

            usuario_model.mail = user_info.mail;
            usuario_model.pass = user_info.pass;
            
            usuario_model.save((err, usuarioStored) => {
                if(err) return res.status(500).json({status: 500,mensaje: err});
                if(!usuarioStored) return res.status(200).json({status: 200,mensaje: "No se pudo Guardar el Usuario."});
            });

            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado." 
            });
        
        });

    },

};
module.exports = controller;