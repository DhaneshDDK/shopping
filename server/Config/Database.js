const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL ,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>console.log('Database connection established')).catch(()=> console.log('Database connection failed'))
}

module.exports = dbConnect