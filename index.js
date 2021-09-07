const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require("./database/connection");
require("dotenv").config({ path: "./config.env" });
const adminRoute = require("./routes/adminRoute");
const reservationRoute = require("./routes/reservationRoute");

const app = express();
app.use(cors())
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({    
  extended: true
}))

// *** MongoDB connection ***
connectDB();

app.use(adminRoute)
app.use(reservationRoute)
// *** Create Local Server ***
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



