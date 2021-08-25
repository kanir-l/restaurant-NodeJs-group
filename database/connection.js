const mongoose = require('mongoose');

const connectDB = async() => {
    try {

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Successfully connected to the database!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;