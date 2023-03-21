const dotenv = require("dotenv")
const mysql = require('mysql2/promise');

dotenv.config()

//MySQL 연결
module.exports={
    pool : mysql.createPool({
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME
    })
};
