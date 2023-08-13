const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");


app.use(cors());
app.use(express.json());
dotenv.config();


app.post("/currency_conv",async(req,res)=>{
    const basesymbol = req.body.basesymbol;
    const anssymbol = req.body.anssymbol;
    const amount = req.body.amount;
    const apikey = process.env.API_KEY;
    await fetch(`https://api.twelvedata.com/currency_conversion?symbol=${basesymbol}/${anssymbol}&amount=${amount}&apikey=${apikey}`).then(r=>{
        r.json().then(data=>{
            res.send(data);
        })
    })
});

app.listen(process.env.PORT,()=>{
    console.log("listening");
});
