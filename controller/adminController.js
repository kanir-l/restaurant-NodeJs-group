const BookingModel = require('../models/BookingSchema');
require('dotenv').config();
const nodemailer = require('nodemailer');

// READ - An api endpoint for /admin
const renderBookingsAdmin = async(req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings)
    } catch (err) {
        console.log(err)
    }
}

// DELETE - An api endpoint for /admin/delete/:id
const deleteBookingAdmin = async(req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.RESET_EMAIL,
            pass: process.env.RESET_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const idParams = req.params.id
        const booking = await BookingModel.findById(idParams, (err, booking) => {
            res.json(booking);
        });

        transporter.sendMail({
            from: process.env.RESET_EMAIL,
            to: `${booking.email}`,
            subject: "L'Isola - Reservation cancelled",
            text: `L'Isola - Your reservation has been cancelled.`,
            html: `<h3>L'Isola</h3>
            <p>Your reservation has been cancelled.</p>
            <p>We hope to see you some other time!</p>
            <p>If you wish to make a new reservation <a href="http://localhost:3000/reservations">click here.</a></p>
            
            `
        }, (err, info) => {
            if (err) {
                return console.log("Error log from nodemailer " + err);
            } else {
                return console.log("Cancel mail has been sent " + info.response);
            }
        });

        await BookingModel.deleteOne({_id: idParams});
        // res.send(idParams);
    } catch (err) {
        console.log(err);
    } 
}

// Request the bookings with condition values recieved from react
const sendingAvailabilityEdit = async(req, res) => {
    const bookings = await BookingModel.find()

    // Filter bookings WITHOUT THE CURRENT EDITING BOOKING ID
    const allExceptEditedBooking = bookings.filter(function(booking) {
        return String(booking._id) !== String(req.query._id)
    })

    // Filter bookings with the requested date 
    const reqDate = req.query.date;
    const bookingsOnReqDate = allExceptEditedBooking.filter(function(booking) {
        return booking.date.includes(reqDate)
    })

    // Calulating by the number of guests requested 
    const reqGuests = req.query.numberOfGuests;
    const reqTablesMath = reqGuests / 6;
    const reqTables = Math.ceil(reqTablesMath);

    const checkingAvailability = (timeslot) => {
        const slotBookings = bookingsOnReqDate.filter(function(booking) {
                return booking.time === timeslot;
        })
        // Map out the no of guests that are already booked on that slot
        const slotGuests = slotBookings.map(booking => booking.numberOfGuests);

        // Loop all of the bookings and divide each guestnumber with 6 to get the number of tables occupied.
        const slotTables = slotGuests.map(guests => guests / 6);

        //Round up where there are decimals
        const occupiedTables = slotTables.map(table => Math.ceil(table));

        // Sum up the number of tables booked on that slot
        const sumSlotTables = occupiedTables.reduce((a, b) => a + b, 0);

        try {
            if (sumSlotTables + reqTables > 15) {
                return (false)
            } else {
                return (true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const slot1Availability = checkingAvailability(18);
    const slot2Availability = checkingAvailability(21);

    return res.send({
        slot1Availability,
        slot2Availability
    })
}

// UPDATE - An api endpoint for /admin/update
const updateBookingAdmin = async(req, res) => {
    const idBooking = req.body.updatedRes._id
    try {
        await BookingModel.findById(idBooking, (err, updatedBooking) => {
            updatedBooking.numberOfGuests = req.body.updatedRes.numberOfGuests
            updatedBooking.date = req.body.updatedRes.date
            updatedBooking.time = req.body.updatedRes.time
            updatedBooking.firstName = req.body.updatedRes.firstName
            updatedBooking.lastName = req.body.updatedRes.lastName
            updatedBooking.phone = req.body.updatedRes.phone
            updatedBooking.email = req.body.updatedRes.email
            updatedBooking.specialRequest = req.body.updatedRes.specialRequest

            updatedBooking.save()
            res.send("Updated the booking from the backend")
        })
    } catch (err) {
        console.log(err)
    }
}

// READ a specific booking ID - An api endpoint for /admin/:id 
const renderBooking = async(req, res) => {
    try {
        const idParams = req.params.id
        await BookingModel.findById(idParams, (err, booking) => {
            res.json(booking)
        })
    } catch (err) {
        console.log(err)
    }
} 

module.exports= {
    renderBookingsAdmin,
    deleteBookingAdmin,
    sendingAvailabilityEdit,
    updateBookingAdmin,
    renderBooking
}
