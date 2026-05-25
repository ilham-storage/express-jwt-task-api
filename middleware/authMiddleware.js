    const jwt = require('jsonwebtoken');

    function authMiddleware(req, res, next){
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).json({
                message : 'Token tidak ditemukan!'
            });
        }
        const token = authHeader.split(' ')[1];
        try{

        jwt.verify(token, 'secretkey');
        next()

        } catch (error){
            return res.status(401).json({
                message : "401 Unauthorized"
            });
        }
    }


    module.exports = {
        authMiddleware
    }