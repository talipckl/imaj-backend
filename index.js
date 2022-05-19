const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
var dbConnect = require('./config/dbConfig');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cari işlemleri
app.use("/api/v1", require("./routes/cari"));

// Fatura işlemleri
app.use("/api/v1", require("./routes/fatura"));

// login işlemleri
app.use("/api/v1", require("./routes/user"));

//mahsup fiş 
app.use("/api/v1", require("./routes/mahsup"))

app.listen(process.env.PORT || 5000, function () {
    console.log(`Server started on port ${process.env.PORT}`)
},
    dbConnect.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Mysql connected...');
            console.log("Server started on port 5000");
        }
    }
    )

);
