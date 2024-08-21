const express = require('express');
const app = express();
const cors = require('cors');
const Razorpay = require('razorpay');
require('dotenv').config()
const PORT = 80;

app.use(cors());


app.use(express.json());

app.post('/createorder', async (req, res) => {

    try {
        
        let {amount,mode} = req.body;
        let apikey = '', secret='';
        if(mode){
            apikey = process.env.LIVE_KEY_ID;
            secret = process.env.LIVE_KEY_SECRET;
        }else{
            
            apikey = process.env.SANDBOX_KEY_ID;
            secret = process.env.SANDBOX_KEY_SECRET;
        }
        var instance = new Razorpay({ key_id: apikey, key_secret: secret });
        const order = await instance.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "receipt#1",
        })
        return res.json({ success: false, order });
    } catch (e) {
        return res.json({ success: false, e });
    }

})


app.get('/', (req, res) => {
    return res.json({success:false,message:"Welcome to Razorpay backend"});
})


app.listen(PORT, () => {
    console.log("Server Running at http://localhost:80");
})