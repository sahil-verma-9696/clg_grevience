const mongoose = require("mongoose");

const connect = async (collection) => {
    const mongoPass = process.env.MONGO_PASS;
    
    // Construct the MongoDB connection URI
    const uri = `mongodb+srv://laptopsahil123:${mongoPass}@cluster0.asnbdyu.mongodb.net/${collection}?retryWrites=true&w=majority&appName=AtlasApp`;

    // Set options for the MongoDB connection
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to MongoDB
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(uri, options);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = {
    connect
};
