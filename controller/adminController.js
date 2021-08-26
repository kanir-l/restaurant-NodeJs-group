const express = require("express");
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

// GET/READ - An api endpoint for /ADMIN
const renderBookingsAdmin = async(req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings);
    } catch (err) {
        console.log(err)
    }
};

// Handles any requests that don't match the ones above
/* app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
}); */

module.exports= {
    renderBookingsAdmin
}