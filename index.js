const express = require('express')
const connectDB = require("./database/connection");
require("dotenv").config({ path: "./config.env" });
const adminRoute = require("./routes/adminRoute");
const reservationRoute = require("./routes/adminRoute");
// const path = require('path');
const app = express();

// *** MongoDB connection ***
connectDB();

// *** Create Local Server ***
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(adminRoute)
app.use(reservationRoute)


