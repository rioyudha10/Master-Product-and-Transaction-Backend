const MongoClient = require('mongodb').MongoClient
const dbconfig = require('../Config/db.config.json').local
var conn = null

const DatabaseConnection = {
    connect: (cb) => {
        let url = dbconfig.host+':'+dbconfig.ports+'/'+ dbconfig.dbname
        console.log(url);
        MongoClient.connect(url,(err,db) => {
            if(!err){
                conn = db.db(dbconfig.dbname)
            }
            cb(err,db)
        })
    },
    getConnection:() =>{
        return conn;
    }
}
module.exports = DatabaseConnection;