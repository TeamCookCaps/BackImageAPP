const dbinit=()=>{
    const mysql = require('mysql2')
    const fs = require('fs');
    const sql = fs.readFileSync('./dbinit.sql').toString();
  
    let con = mysql.createConnection({
      host: "localhost",
      user: "capsid",
      password: "capspw",
      multipleStatements: true // this allow you to run multiple queries at once.
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected yet no db is selected yet!");
      
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    });
  }
  
  
  module.exports={
    dbinit,
  }