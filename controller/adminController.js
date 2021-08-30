const express = require("express")
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

// READ - An api endpoint for /ADMIN
const renderBookingsAdmin = async(req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings)
    } catch (err) {
        console.log(err)
    }
};

/* DELETE - An api endpoint for /ADMIN/DELETE/:ID
    const deleteBookingAdmin
 */

/* UPDATE - An api endpoint for /ADMIN/EDIT/:ID
    const updateBookingAdmin */


module.exports= {
    renderBookingsAdmin
}
