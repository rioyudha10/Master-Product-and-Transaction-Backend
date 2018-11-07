const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../Datalayer/dt')
const DB = require('../Models/db')
const db = DB.getConnection()

const M_role_BisnisLogic = {
    readRoleAlHandler: (req,res,next) => {
        dtl.readRoleAlHandlerData(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    readRoleById: (req,res,next) => {
        id = req.params.companyid;
        dtl.readRoleById(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },

    updateRoleHandler:(req,res,next)=>
    {
        let id = req.params.companyid;
        const data = {
            name : req.body.name,
            description : req.body.description,
            update_by : "rio",
            update_date : new Date().toString()
            

        }
        //console.log(req.userdata)
        dtl.updateRoleHandlerData(function(items){
            ResponseHelper.sendResponse(res,200,items)
        },id,data)
    },

    deleteRoleHandler: (req,res,next) => {
        id = req.params.companyid;
        dtl.deleteRoleHandler(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    
    create_role_Handler:(req,res,next)=>
    {
        
        const dt=req.body 
        //console.log(JSON.stringify(data))
        dtl.countRole(function(item){
            dtl.create_role_Handler(function(items){
                ResponseHelper.sendResponse(res,200,items)
            },dt,item)
        })
        // console.log(data)
         
    },
    
}


module.exports = M_role_BisnisLogic;