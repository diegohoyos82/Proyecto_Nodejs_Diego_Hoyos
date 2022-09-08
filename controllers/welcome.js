'use strict'
var controller = {

    welcome: function(rep , res){
        console.log("Get Ejecutando en raiz");
        res.send("Mi primer debug 1")
    }
    /*,

    alumnos: function(rep, res){
        res.send("Mi listado de alumnos 1");
    },

    alumno: function(rep, res){
        let cal1 = 5;
        let cal2 = 5;
        let cal3 = 5;
        let final = (cal1 + cal2 + cal3)/3;
        console.log(final);
        //res.send("el detalle de un alumno");
       // res.send("la calificacion final es: " +final);
       
       if (final <= 6){
            return res.status(400).json({
            status: 400,
            cal_final: final
           })
       }
       else{
            return res.status(200).json({
            status: 200,
            cal_final: final
           })
       }
       
       
    },

    create_alumno: function(req, res){
        let  user_info = req.body;
        console.log(user_info);
        //res.send("Creamos un alumno " + user_info.nombre + " Edad " + user_info.edad);
        return res.status(200).json({
            status: 200,
            nombre_del_alumno: user_info.nombre + " " + user_info.apellido,
            edad: user_info.edad
        })    
    },

    update_alumno: function(rep, res){
        res.send("Actualizamos un alumno 1");
    }*/

};

module.exports = controller;