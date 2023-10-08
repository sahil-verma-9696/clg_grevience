const mongoose = require("mongoose");

const connect = async (collection)=>{
    const pass = process.env.MONGO_PASS;
    const uri = `mongodb+srv://laptopsahil123:${pass}@cluster0.asnbdyu.mongodb.net/${collection}`;

    db_url = `mongodb+srv://laptopsahil123:${pass}@cluster0.asnbdyu.mongodb.net/${collection}?retryWrites=true&w=majority&appName=AtlasApp`;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connect = mongoose.connection; 
    connect.on('error', console.error.bind(console, 'MongoDB connection error:'));
    connect.once("open",()=>console.log('Connected to MongoDB Atlas'))
}

module.exports =  {
    connect
}