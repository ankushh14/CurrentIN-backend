const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");


app.use(cors());
app.use(express.json());
dotenv.config();


try{
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
}catch(e){
    console.log(e.message)
}

try{
app.get('/coinprice',async(req,res)=>{
    const page = req.query.page;
    let offset = 0;
    if(page == 0){
        offset = Math.floor(8*page);
    }else{
     offset = Math.floor(8*page+1);
    }
    const response = await fetch(`https://api.coinranking.com/v2/coins?orderBy=price&limit=8&offset=${offset}`)
    if(response.status === 200){
    const resdata = await response.json();
    const responsearray =  await resdata.data.coins.map(r=>{
        return{
            naming:r.name,
            symbol:r.symbol,
            logo:r.iconUrl,
            price:r.price,
        }
    })
    res.send(responsearray);
}else{
    console.log(response.status)
    console.log("error aagaya")
}
})
}catch(e){
    console.log(e.message)
}

app.listen(process.env.PORT,()=>{
    console.log("listening");
});
