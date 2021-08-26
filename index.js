const express = require('express')
const connectDB = require("./database/connection");
require("dotenv").config({ path: "./config.env" });
const adminRoute = require("./routes/adminRoute");
const reservationRoute = require("./routes/reservationRoute");
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

/* app.get("/reservations/confirmation", async(req, res) => {
    try {
        const booking = new BookingModel({
            id: 4,
            numberOfGuests: 5,
            time: 21,
            firstName: "This is hard code on the index",
            lastName: "Dummy lastName",
            phone: 123456789,
            email: "dummy@email.com",
            specialRequest: "VIP corner please"
        })
        await booking.save()
        res.send("Thank you for your reservation")
    } catch (err) {
        console.log(err)
    }
}) */


