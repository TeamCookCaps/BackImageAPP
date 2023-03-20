const mysql = require('mysql2/promise');

//MySQL 연결
module.exports={
    pool : mysql.createPool({
        host:'localhost',
        port:'3306',
        user:'capsid',
        password:'capspw',
        database:'capstonedb'
    })
};
