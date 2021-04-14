const express = require('express');
const app = express();
const _port = 5500;
const db = require('./db');
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/users', async (req, res) => {
    try{
        let results = await db.getAll();
        res.json(results);
    }
    catch(err){
        res.send(err);
    }
})

app.post('/api/user', async (req, res) => {
    try{
        let results = await db.insertData();
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
})

app.put('/api/update/:id', async (req, res) => {
    try{
        let results = await db.upadteData(req.params.id);
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
})

app.delete('/api/delete/:id', async (req, res) => {
    try{
        let results = await db.deleteData(req.params.id);
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
})
app.listen(_port, (err) => {
    if(err ){ throw err; }
    console.log(`Server running on ${_port}`);
})