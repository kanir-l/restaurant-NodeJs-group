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
}

const deleteBookingAdmin = async(req, res) => {
    try {
        const idParams = req.params.id
        await BookingModel.deleteOne({_id: idParams});
        res.send(idParams)
        window.location.reload()
    } catch (err) {
        console.log(err)
    } 
}

/* UPDATE - An api endpoint for /ADMIN/EDIT/:ID
    const updateBookingAdmin */


module.exports= {
    renderBookingsAdmin,
    deleteBookingAdmin
}
