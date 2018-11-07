const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../Datalayer/dt')
const DB = require('../Models/db')
const db = DB.getConnection()
const authConfig = require('../Config/auth.config.json')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);

const M_user_BisnisLogic = {
    readUserAlHandler: (req,res,next) => {
        dtl.readUserAlHandlerData(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    create_user_Handler:(req,res,next) => {
        const newuser = {
             username : req.body.username,
             password : bcrypt.hashSync(req.body.password, salt),
             m_role_id : req.body.m_role_id,
             m_employee_id : req.body.m_employee_id,
             is_delete : req.body.is_delete,
             created_by : req.body.created_by,
             created_date : req.body.created_date,
             update_by : req.body.updated_by,
             updated_date : req.body.updated_date
        }
        //console.log(JSON.stringify(data))
        dtl.create_user_Handler(function (items){
            ResponseHelper.sendResponse(res,200,items)
       },newuser)
    },

    readUserById: (req,res,next) => {
        id = req.params.id;
        dtl.readUserById(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    
    readloginById: (req,res,next) => {
        const username = req.body.username
        const password = req.body.password
            dtl.readloginById(docs => {
                if (docs){
                    if (bcrypt.compareSync(password, docs.password)) {
                        let token = jwt.sign(docs, authConfig.secretkey)

                        delete docs.password
                        let berkas = {
                            userdata: docs,
                            token:token
                        }
                        ResponseHelper.sendResponse(res, 200, berkas)
                    } else {
                        ResponseHelper.sendResponse(res, 404, 'Password salah')
                    }
            } else {
                ResponseHelper.sendResponse(res, 404, 'User ga ada')
            }
        },username)

    },

    deleteUserHandler: (req,res,next) => {
        id = req.params.companyid;
        dtl.deleteUserHandler(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },

}

module.exports = M_user_BisnisLogic;