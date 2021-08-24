const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    guest: {
        type: Number,
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    date: {
        type: Date
    },
    time: { 
        type: String
    }
})

const BookingModel = mongoose.model('bookings', BookingSchema)

module.exports = BookingModel