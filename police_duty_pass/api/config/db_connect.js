const mysql = require('mysql')
const config = require('../.env')
// Conntection Credentials
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'police_id_pass_gen_db',
    multipleStatements: true
});
// MySQL DB Connetion
mysqlConnection.connect((err) => {
    if (err) {
        console.log(JSON.stringify(err, undefined, 2));
    } else {
        console.log("DB Connection Successful");
    }
});

module.exports = mysqlConnection