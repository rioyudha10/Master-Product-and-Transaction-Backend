
const restify = require('restify');
const DatabaseConnection = require('./Models/db')
const authmiddelware = require('./middlewares/authmiddleware')
const corsMiddleware = require('restify-cors-middleware')




DatabaseConnection.connect((err,db) => {
    if(err != null){
        console.log(err)
        process.exit()
    } else {
        console.log('[DATABASE] connected')
        const server = restify.createServer()
        const port = process.env.PORT || 3000
        //BisnisLogic
        const CompanyBisnisLogic = require('./Bisnislogic/M_company_BisnisLogic')

        //User Logic
        const UserBisnisLogic = require('./Bisnislogic/M_user_BisnisLogic')

        //role Logic
        const RoleBisnisLogic = require('./Bisnislogic/M_role_BisnisLogic')

        //menu Logic
        const MenuBisnisLogic = require('./Bisnislogic/M_menu_BisnisLogic')

        //cors middlware
        const cors = corsMiddleware ({
            origins : ["*"],
            allowHeaders : ["Authorization"]
        });
        server.pre(cors.preflight);
        server.use(cors.actual);


        //routes
        
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false}));


        //company
        server.get('/api/company',authmiddelware.checkToken, CompanyBisnisLogic.readCompanyAlHandler)
        server.get('/api/company/:companyid',authmiddelware.checkToken,CompanyBisnisLogic.readOneById)
        server.post('/api/company',authmiddelware.checkToken,CompanyBisnisLogic.create_company_Handler)
        server.put('/api/company/:companyid',authmiddelware.checkToken,CompanyBisnisLogic.updateCompanyHandler)
        server.del('/api/company/:companyid',authmiddelware.checkToken,CompanyBisnisLogic.deleteCompanyHandler)

        //user
        server.get('/api/user',authmiddelware.checkToken,UserBisnisLogic.readUserAlHandler)
        server.get('/api/user/:id',authmiddelware.checkToken,UserBisnisLogic.readUserById)
        server.post('/api/user',authmiddelware.checkToken,UserBisnisLogic.create_user_Handler)
        server.del('/api/user/:companyid',authmiddelware.checkToken,UserBisnisLogic.deleteUserHandler)

        //login
        server.post('/api/auth/login',UserBisnisLogic.readloginById)

        //role
        server.get('/api/role',authmiddelware.checkToken,RoleBisnisLogic.readRoleAlHandler)
        server.get('/api/role/:companyid',authmiddelware.checkToken,RoleBisnisLogic.readRoleById)
        server.post('/api/role',authmiddelware.checkToken,RoleBisnisLogic.create_role_Handler)
        server.put('/api/role/:companyid',authmiddelware.checkToken,RoleBisnisLogic.updateRoleHandler)
        server.del('/api/role/:companyid',authmiddelware.checkToken,RoleBisnisLogic.deleteRoleHandler)

        //menu
        server.get('/api/menu',authmiddelware.checkToken,MenuBisnisLogic.readMenuAlHandler)
        server.get('/api/menu/:companyid',authmiddelware.checkToken,MenuBisnisLogic.readMenuById)
        server.post('/api/menu',authmiddelware.checkToken,MenuBisnisLogic.create_menu_Handler)
        server.put('/api/menu/:companyid',authmiddelware.checkToken,MenuBisnisLogic.updateMenuHandler)
        server.del('/api/menu/:companyid',authmiddelware.checkToken,MenuBisnisLogic.deleteMenuHandler)


        server.listen(port,() =>{
            console.log('[SERVER] running at port' + port)
        })
    }
})