const express = require("express");
const router = express.Router();
const dbConnect = require("../config/dbConfig");

// mahsup kayıt alış ve satışa göre




router.post("/mahsup", (req, res) => {
  dbConnect.query(
    "INSERT INTO mahsup(cari_id,borc,alacak,tarih) values(?,?,?,?)",
    [req.body.cari_id, req.body.borc, req.body.alacak, req.body.tarih],
    (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Mahsup Kayıt Edildi");
      }
    }
  );
});

// mahsup kayıtlarını getir
router.get("/mahsup/:id", (req, res) => {
  dbConnect.query(
    " select " +
      " mh.*, " +
      " abs(if(bak.bakiye>0,bak.bakiye,0)) as borc_bakiye, " +
      " abs(if(bak.bakiye<0,bak.bakiye,0)) as alacak_bakiye, " +
      " cari.adi as cariadi " +
      " from mahsup as mh, " +
      " lateral( " +
      "	select SUM(borc) - SUM(alacak) as bakiye from mahsup where cari_id=mh.cari_id and id <=mh.id " +
      " ) as bak, " +
      " lateral( " +
      " select max(adi) as adi from cari where id=mh.cari_id " +
      " ) as cari " +
      " where cari_id = ? order by mh.tarih asc; ",
    [req.params.id],
    (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(response);
      }
    }
  );
});

router.get("/mahsup/cari/:id", (req, res) => {
  dbConnect.query(
    " select " +
      " abs(if(SUM(borc)-SUM(alacak)>0,SUM(borc)-SUM(alacak),0)) as borc_bakiye, " +
      " abs(if(SUM(borc)-SUM(alacak)<0,SUM(borc)-SUM(alacak),0)) as alacak_bakiye, " +
      " cari.adi as cariadi " +
      " from mahsup as mh " +
      " left join cari on cari.id = mh.cari_id " +
      " where mh.cari_id=? ",
    [req.params.id],
    (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(response);
      }
    }
  );
});

// bütün cari bakiyeleri
router.get("/mizan", (req, res) => {
  dbConnect.query(
    " select " +
      " abs(if(SUM(borc)-SUM(alacak)>0,SUM(borc)-SUM(alacak),0)) as borc_bakiye, " +
      " abs(if(SUM(borc)-SUM(alacak)<0,SUM(borc)-SUM(alacak),0)) as alacak_bakiye, " +
      " max(cari.adi) as cariadi " +
      " from mahsup as mh " +
      " left join cari on cari.id = mh.cari_id " +
      " group by cari_id ",
    (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(response);
      }
    }
  );
});

// mahsup kayıtlarını sil
router.delete("/mahsup/:id", (req, res) => {
  dbConnect.query("DELETE FROM mahsup WHERE id = ?", [req.params.id], (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("Mahsup Kayıt Silindi");
    }
  });
});

// mahsup kayıtlarını getir
router.get("/muhasebe/:id", (req, res) => {
  dbConnect.query("SELECT * FROM mahsup WHERE id = ?", [req.params.id], (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

// Mahsup kayıtlarını güncelle

router.put("/mahsup/:id", (req, res) => {
  dbConnect.query("UPDATE mahsup SET ? WHERE id = ?", [req.body, req.params.id], (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("Mahsup Kayıt Güncellendi");
    }
  });
});

// ture gore miktar farkı alma
router.get("/stok",(req,res)=>{
  dbConnect.query("SELECT  sum(IF(tur='ALIŞ',miktar,0))  - sum(IF(tur='SATIŞ',miktar,0))  AS miktar FROM fatura ",(err,response)=>{
    if (err) {
      console.log(err);
      res.send(err);
    } else {
     
      res.send(response)
    }
  })
})

module.exports = router;
