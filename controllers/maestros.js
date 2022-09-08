'use strict'

const { validationResult } = require('express-validator');

var Maestro = require('../models/maestros');

var controller = {
    maestros: function(req, res){
        
        Maestro.find({}).exec( (err, maestros) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!maestros) return res.status(200).json({status: 200,mensaje: "No hay Maestros por Mostrar."});

            return res.status(200).json({
                status: 200,
                data: maestros
            });

        });

    },

    maestro: function(req, res){
        
        let n_lista = req.params.id_doc;

       

        Maestro.findOne({id_doc: n_lista}).exec( (err, maestro) =>{
            console.log(req);
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!maestro) return res.status(200).json({status: 200,mensaje: "No se encontro el Maestro Indicado."});
           
            return res.status(200).json({
                status: 200,
                data: maestro
            });

        });

    },

    crear_maestro: function(req, res){

        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;


        Maestro.findOne({id_doc: user_info.id_doc}).exec( (err, maestro) =>{
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(maestro) return res.status(200).json({status: 200,mensaje: "El numero de ID ya existe."});
        
            let maestros_model = new Maestro();

            maestros_model.id_doc = user_info.id_doc;
            maestros_model.nombre = user_info.nombre;
            maestros_model.apellido = user_info.apellido;
            maestros_model.materia = user_info.materia;

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500,mensaje: err});
                if(!maestroStored) return res.status(200).json({status: 200,mensaje: "No se pudo Guardar el Maestro."});
            });

            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado." 
            });
        
        });

    },

    update_maestro: function(req, res) {
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let n_lista = req.params.id_doc;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre, 
            apellido: user_info.apellido, 
            materia: user_info.materia 
        };

        Maestro.findOneAndUpdate({id_doc: n_lista}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if(err) return res.status(500).json({message: 'Error al actualizar.'});
            if(!maestroUpdate) return res.status(404).json({message: 'No existe el maestro.'});


            console.log(maestroUpdate);

            return res.status(200).json({
                nombre: maestroUpdate.nombre, 
                apellido: maestroUpdate.apellido, 
                materia: maestroUpdate.materia 
            });


        });

        
        
    },

    
    delete_maestro: function(req, res) {

        let n_lista = req.params.id_doc;

        Maestro.findOneAndRemove({id_doc: n_lista}, (err, maestroDelete) => {
            if(err) return res.status(500).json({message: 'Error al eliminar.'});
            if(!maestroDelete) return res.status(404).json({message: 'No existe el maestro.'});

            return res.status(200).json({
                message: "Usuario eliminado."
            });

        });

    }
    

};
module.exports = controller;