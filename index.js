const express = require('express')
const BookingModel = require('./models/BookingSchema')

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

// GET - An api endpoint for /ADMIN
app.get('/admin', async(req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings);
    } catch (err) {
        console.log(err)
    }
});

// POST - An api endpoint for /RESERVATION
app.get('/reservations', async(req, res) => {
    try {
        const booking = new BookingModel({
            id: 2,
            guest: 3,
            date: new Date(),
            time: 21.00,
            name: "Dada dada",
            phone: 123456,
            email: "dada@info.com"
        })
        await booking.save()
        res.send(booking)
    } catch (err) {
        console.log(err)
    }
})

/* 
app.get('/admin', async (req, res) => {
    const booking = [
        {
            id: 1,
            guest: 3,
            date: new Date(),
            time: 21.00,
            name: "Jane Doe",
            phone: 0123456,
            email: "janedoe@info.com"
        }
    ]
    booking.send()
    res.json()
});  */


// Handles any requests that don't match the ones above
/* app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
}); */