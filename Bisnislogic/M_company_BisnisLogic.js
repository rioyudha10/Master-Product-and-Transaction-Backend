const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../Datalayer/dt')
const DB = require('../Models/db')
const db = DB.getConnection()

const M_company_BisnisLogic = {
    readCompanyAlHandler: (req,res,next) => {
        dtl.readCompannyAlHandlerData(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    readOneById: (req,res,next) => {
        id = req.params.companyid;
        dtl.readOneById(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },

    updateCompanyHandler:(req,res,next)=>
    {
        let id = req.params.companyid;
        const data = {
            name : req.body.nameku,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email,
            update_by : req.body.update_by,
            update_date : new Date().toString()
            

        }
        //console.log(req.userdata)
        dtl.updateCompanyHandlerData(function(items){
            ResponseHelper.sendResponse(res,200,items)
        },id,data)
    },

    deleteCompanyHandler: (req,res,next) => {
        id = req.params.companyid;
        dtl.deleteCompanyHandler(items=>{
            ResponseHelper.sendResponse(res,200,items)
        });
    },
    create_company_Handler:(req,res,next)=>
    {
        
        const data=req.body 
        //console.log(JSON.stringify(data))
        dtl.countAll(function(item){
            dtl.create_company_Handler(function(items){
                ResponseHelper.sendResponse(res,200,items)
            },data,item)
        })
        console.log(data)
         
    },
    
}


module.exports = M_company_BisnisLogic;