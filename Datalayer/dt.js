const DB = require('../Models/db')
const ObjectID = require('mongodb').ObjectID
const M_company = require('../Models/M_company_model')
const M_user = require('../Models/M_user_model')
const M_role = require('../Models/M_role_model')
const M_menu = require('../Models/M_menu_model')

const db = DB.getConnection()
const dt = {
    // start company
    readCompannyAlHandlerData : (callback) => {
        db.collection('MasterCompany').find({is_delete:null}).sort({code:1}).toArray((err,docs)=>{
            let m_company = docs.map((ele)=>{
                return new M_company(ele);
            });
            callback(m_company); 
        });
    },

    readOneById : (callback) => {
        db.collection('MasterCompany').find({code : id}).sort({code:1}).toArray((err,docs)=>{
            let m_company = docs.map((ele)=>{
                return new M_company(ele);
            })
            callback(m_company); 
        });
    },

    updateCompanyHandlerData: (callback,id,data) => { //res=lempar data ke client
        console.log(id)
        db.collection('MasterCompany').updateOne({_id:new ObjectID(id)},{$set:data},
            ((err, docs) => {
                callback(docs)
            }))
    },

    deleteCompanyHandler : (callback) => {
        db.collection('MasterCompany').updateOne({code:id},{$set:{is_delete:"true"}},
        ((err, docs) => {
            callback(docs)
        }))

    },

    create_company_Handler : (callback,data,hasil) =>{
        let kode ="CP"
        for (i=0;i<4-(hasil+1).toString().length;i++)
       {
        kode+='0'
       }
       kode+=hasil+1
       
        let company_object=new M_company(data)
         company_object.code=kode
         console.log(company_object.code)
        company_object.created_date=new Date().toDateString()   

        db.collection('MasterCompany').insertOne(
            company_object,(err,docs)=>{
            callback(docs)
        } )
    },
    countAll:(callback)=>
    {
        db.collection('MasterCompany').count(
            (err,docs)=>callback(docs)
        )
    },
    // end company

    //start user
    readUserAlHandlerData : (callback) => {
        db.collection('MasterUser').find({is_delete:null}).sort({code:1}).toArray((err,docs)=>{
            let m_user = docs.map((ele)=>{
                return new M_user(ele);
            });
            callback(m_user); 
        });
    },

    readUserById : (callback) => {
        db.collection('MasterUser').find({username : id}).sort({code:1}).toArray((err,docs)=>{
            let m_user = docs.map((ele)=>{
                return new M_user(ele);
            })
            callback(m_user); 
        });
    },

    create_user_Handler : (callback,data) =>{
        console.log(JSON.stringify(data))
        let user_object = new M_user(data)
        user_object.created_date = new Date()
        user_object.update_by= 'Yudha'
        user_object.update_date = new Date()  
        db.collection('MasterUser').insert(
            user_object, ((err,docs)=>{
                callback(docs)
            })
        )
    },

    deleteUserHandler : (callback) => {
        db.collection('MasterUser').updateOne({username : id},{$set:{is_delete:"true"}},
        ((err, docs) => {
            callback(docs)
        }))

    },
    //end user

    //start login
    readloginById : (callback, username) => {
        db.collection('MasterUser').findOne({is_delete : null, username : username},(err,docs) => {
            callback(docs);
        })
    },
    //end login

    //start role
    readRoleAlHandlerData : (callback) => {
        db.collection('MasterRole').find({is_delete:null}).sort({code:1}).toArray((err,docs)=>{
            let m_role = docs.map((ele)=>{
                return new M_role(ele);
            });
            callback(m_role); 
        });
    },

    readRoleById : (callback) => {
        db.collection('MasterRole').find({code : id}).sort({code:1}).toArray((err,docs)=>{
            let m_role = docs.map((ele)=>{
                return new M_role(ele);
            })
            callback(m_role); 
        });
    },

    updateRoleHandlerData: (callback,id,data) => { //res=lempar data ke client
        console.log(id)
        db.collection('MasterRole').updateOne({_id:new ObjectID(id)},{$set:data},
            ((err, docs) => {
                callback(docs)
            }))
    },

    deleteRoleHandler : (callback) => {
        db.collection('MasterRole').updateOne({code:id},{$set:{is_delete:"true"}},
        ((err, docs) => {
            callback(docs)
        }))

    },

    create_role_Handler : (callback,dt,result) =>{
        let k ="RL"
        for (i=0;i<4-(result+1).toString().length;i++)
       {
        k+='0'
       }
       k+=result+1
       
        let role_object=new M_role(dt)
         role_object.code=k
        //  console.log(company_object.code)
        role_object.created_date=new Date().toDateString()   

        db.collection('MasterRole').insertOne(
            role_object,(err,docs)=>{
            callback(docs)
        } )
    },
    countRole:(callback)=>
    {
        db.collection('MasterRole').count(
            (err,docs)=>callback(docs)
        )
    },
    //end role

    //start menu
    readMenuAlHandlerData : (callback) => {
        db.collection('MasterMenu').find({is_delete:null}).sort({code:1}).toArray((err,docs)=>{
            let m_menu = docs.map((ele)=>{
                return new M_menu(ele);
            });
            callback(m_menu); 
        });
    },

    readMenuById : (callback) => {
        db.collection('MasterMenu').find({code : id}).sort({code:1}).toArray((err,docs)=>{
            let m_menu = docs.map((ele)=>{
                return new M_menu(ele);
            })
            callback(m_menu); 
        });
    },

    updateMenuHandlerData: (callback,id,data) => { //res=lempar data ke client
        console.log(id)
        db.collection('MasterMenu').updateOne({_id:new ObjectID(id)},{$set:data},
            ((err, docs) => {
                callback(docs)
            }))
    },

    deleteMenuHandler : (callback) => {
        db.collection('MasterMenu').updateOne({code:id},{$set:{is_delete:"true"}},
        ((err, docs) => {
            callback(docs)
        }))

    },

    create_menu_Handler : (callback,dt,result) =>{
        let k ="M"
        for (i=0;i<4-(result+1).toString().length;i++)
       {
        k+='0'
       }
       k+=result+1
       
        let menu_object=new M_menu(dt)
         menu_object.code=k
        //  console.log(company_object.code)
        menu_object.created_date=new Date().toDateString()   

        db.collection('MasterMenu').insertOne(
            menu_object,(err,docs)=>{
            callback(docs)
        } )
    },
    countMenu:(callback)=>
    {
        db.collection('MasterMenu').count(
            (err,docs)=>callback(docs)
        )
    }
    //end menu
    

    
}

//query nya taro disini 
module.exports = dt;