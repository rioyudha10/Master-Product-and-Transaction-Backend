const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../Datalayer/dt')
const DB = require('../Models/db')
const db = DB.getConnection()

const M_menu_BisnisLogic = {
    readMenuAlHandler: (req,res,next) => {
        dtl.readMenuAlHandlerData(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    readMenuById: (req,res,next) => {
        id = req.params.companyid;
        dtl.readMenuById(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },

    updateMenuHandler:(req,res,next)=>
    {
        let id = req.params.companyid;
        const data = {
            name : req.body.name,
            controller : req.body.controller,
            parent_id : req.body.parent_id,
            updated_by : "rio",
            updated_date : new Date().toString()
            

        }
        //console.log(req.userdata)
        dtl.updateMenuHandlerData(function(items){
            ResponseHelper.sendResponse(res,200,items)
        },id,data)
    },

    deleteMenuHandler: (req,res,next) => {
        id = req.params.companyid;
        dtl.deleteMenuHandler(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    create_menu_Handler:(req,res,next)=>
    {
        
        const data=req.body 
        //console.log(JSON.stringify(data))
        dtl.countMenu(function(item){
            dtl.create_menu_Handler(function(items){
                ResponseHelper.sendResponse(res,200,items)
            },data,item)
        })
        console.log(data)
         
    },
    
}


module.exports = M_menu_BisnisLogic;