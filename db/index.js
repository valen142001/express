const mysql = require('mysql');
const conn =mysql.createConnection({
host : 'localhost',
user: 'expressjs',
password: 'password',
database: 'expressjs'
});

conn.connect( (err) =>{
    if (err) {throw err;}
    console.log('Connected to database');
});
 
const db = {
    createTable: () => {
        const sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT, firstname VARCHAR(80), lastname VARCHAR(80), PRIMARY KEY(id));"
        conn.query(sql,  (err) => {
         if (err) {throw err;}
         console.log('Table created successfully..');
   })
},

getAll: () => {
    return new Promise( (resolve, reject) =>{
        const sql = "SELECT * FROM test_table";
        conn.query(sql, (err, result) => {
            if(err){ return reject (err);}
            return resolve(result);
        })
    });
},

insertData: () => {
    return new Promise( (resolve, reject) =>{
        const data = {firstname: "Glory", lastname: "Jane"};
        const sql = "INSERT INTO test_table SET ?";
        conn.query(sql, data,  (err) => {
            if(err){ return reject (err);}
            return resolve("Data inserted to database");
        })
    });
},

updateData: (id) => {
    return new Promise( (resolve, reject) =>{
        const data = {id: id, firstname: "Sasa", lastname: "Gurl"};
        const sql = "REPLACE INTO test_table SET ?";
        conn.query(sql, data,  (err) => {
            if(err){ return reject (err);}
            return resolve("Update data");
        })
    });
},


deleteData: (id) => {
    return new Promise( (resolve, reject) =>{
        const sql = "DELETE FROM test_table where id = ?";
        conn.query(sql, id,  (err) => {
            if(err){ return reject (err);}
            return resolve("Data deleted");
        })
    });
}
    
};

module.exports = db;