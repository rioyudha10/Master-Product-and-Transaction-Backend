const jwt = require('jsonwebtoken')
const authconfig = require('../Config/auth.config.json')
const ResponseHelper = require('../helpers/ResponseHelper')
module.exports = {
    checkToken: (req,res,next) => {
        console.log(req.headers)
        if(!req.headers.authorization){
            ResponseHelper.sendResponse(res,403,'Kamu ga di izinin')
        } else {
            let token = req.headers.authorization
            jwt.verify(token,authconfig.secretkey, (err,decoded)=>{
                if(decoded==undefined){
                    ResponseHelper.sendResponse(res,403,'Lu ga punya izin')
                } else {
                    req.userdata = decoded
                    next()
                }
            })
        }
    }
}