const util = require('util');
const mysql = require('mysql');
/* 
 Connection to the datbase;
*/
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'harvi',
    password: '1234',
    database: 'psoftver'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;