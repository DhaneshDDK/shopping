const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

const port = process.env.PORT || 2000

const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials : true
  }));


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})

const userRoutes = require('./Routes/User');
app.use("/api/v1/auth",userRoutes)

const dbConnect = require('./Config/Database');
dbConnect();

app.get('/',(req,res)=>{
    res.json({
        message : "Welcome to ECOMZY!!",
    })
})

