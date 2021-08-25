const express = require('express')

const connectDB = require("./database/connection");
// const path = require('path');
const app = express();
require("dotenv").config({ path: "./config.env" });


// *** MongoDB connection ***
connectDB();

const PORT = process.env.PORT || 8080;


// *** Create Local Server ***
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});