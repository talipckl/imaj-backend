const express = require('express');
const router = express.Router();
const dbConnect = require('../config/dbConfig');


// bütün veri getirmek için
router.get("/fatura",(req,res)=>{
    dbConnect.query("SELECT * FROM fatura",(err,response)=>{
        if(err){
            console.log(err);
           res.send(err);
        }else{
            res.send(response);
        }
    })
})

// bir veri getirmek için

router.get("/fatura/:id",(req,res)=>{
    dbConnect.query("SELECT * FROM fatura where id = ?",[req.params.id],(err,response)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(response);
        }
    })
})


// veri eklemek için

router.post("/fatura",(req,res)=>{
    dbConnect.query("INSERT INTO fatura(tur,cari_id,miktar,fiyat,tutar,tarih) values(?,?,?,?,?,?)",[req.body.tur,req.body.cari_id,req.body.miktar,req.body.fiyat,req.body.tutar,req.body.tarih],(err,response)=>{
        if(err){
            console.log(err);
           
        }else{
            
            res.send(response);
        }
    })
})


//tahsilata fatura ekleme
router.post("/fatura/tahsilat/:id", (req, res) => {
    dbConnect.query("insert into tahsilat(tur,cari_id,borc) select tur,cari_id,tutar from fatura where id =?", [req.params.id], (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Tahsilat Kayıt Edildi");
      }
  })
})

// veri güncellemek için

router.put("/fatura/:id",(req,res)=>{
    dbConnect.query("UPDATE fatura SET tur = ?,cari_id = ?,miktar = ?,fiyat = ?,tutar = ?,tarih = ? where id = ?",[req.body.tur,req.body.cari_id,req.body.miktar,req.body.fiyat,req.body.tutar,req.body.tarih,req.params.id],(err,response)=>{
        if(err){
            console.log(err);
           send(err);
        }else{
            res.send(response);
        }
    })
})


// veri silmek için

router.delete("/fatura/:id",(req,res)=>{
    dbConnect.query("DELETE FROM fatura where id = ?",[req.params.id],(err,response,fields)=>{
        if(!err){
            res.send(err)
        }else{
            throw err
        }
    }
    )
})

// inner join için 

router.get("/fatura_liste",(req,res)=>{
    dbConnect.query("SELECT fatura.id,fatura.tur,fatura.cari_id,fatura.miktar,fatura.fiyat,fatura.tutar,fatura.tarih,cari.adi FROM fatura INNER JOIN cari ON fatura.cari_id = cari.id",(err,response)=>{
        if(err){
            console.log(err);
              res.send(err);
        }else{
            res.send(response);
        }
    }
    )

})

// fatura muhasebeleşitirmek


module.exports = router;
