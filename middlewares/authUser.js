'use strict'
const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token, 'BAiAoYDToQh5bE7TaOPvLTXk6Ss5LvhyWQs7MmcFaQy8DTKkbqmXVZCeWuL47BVqSVXpgOdlEoxeZjAsJXJYCovTCYVgyQkS6xvzRpw6MDf9iKgYpf5ynvjoMAvtoWCZLPhlLqEgd4yMsbyQz6YRY1FVcLGBkTihwGYAAZTnUSyX0oa7OkqIkdmH56A1AKIrCRjtCNBfU9xsq24kA5JHn08mL1HFWewtFiPXcUCQT3DPYhXUgeOlEQUC3IDrCNq5', (err, decoded) => {
                if(err){
                    return res.status(403).json({message: "Token invalida."});
                }else{
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{
                        if(err) return req.status(500).send({message: "Error al devolver los datos."});
                        if(!session) return res.status(404).send({message:"Los datos de autenticación no son validos."});
                        
                        next();

                    });
                }
            });

        }else{
            res.status(403).send({
                message: "Token no valido."
            });
        }
    }
};
module.exports = middlewares;