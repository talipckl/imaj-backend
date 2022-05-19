const express = require('express');
const router = express.Router();
const dbConnect = require('../config/dbConfig');

router.post('/cari', (req, res) => {
    dbConnect.query('INSERT INTO cari(adi) values(?)',[req.body.adi],(err,response)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

router.get('/cari', (req, res) => {
    dbConnect.query('SELECT * FROM cari',(err,response)=>{
        if(err){
            console.log(err);
            res.send(err);
            res.send("Kayıt Bulunamadı");
        }else{
            res.send(response);
            
        }
    
    })
} )

router.get('/carim/:id', (req, res) => {
    dbConnect.query('SELECT * FROM cari where id = ?',[req.params.id],(err,response)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(response);
        }
    } )
} )

router.delete('/cari/:id', (req, res) => {
    dbConnect.query('DELETE FROM cari where id = ?',[req.params.id],(err,response,fields)=>{
        if(!err){
           
            res.send("kayit silindi");
        }else{
           throw err
        }
    } )
} )

router.put('/cari/:id', (req, res) => {
    dbConnect.query('UPDATE cari SET adi = ? where id = ?',[req.body.adi,req.params.id],(err,response)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(response);
        }
    } )
} )

module.exports = router;