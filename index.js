const express = require('express')
const mongoose = require('mongoose')
const BookingModel = require('./models/BookingSchema')
//const path = require('path')

const app = express()

// Serve the static files from the React app
/* app.use(express.static(path.join(__dirname, 'client/build'))); */

// DATABASE connection
/* mongoose.connect("mongodb+srv://fed20mi:fed20mi@cluster0.dz7ob.mongodb.net/restaurent?retryWrites=true&w=majority", options, (err) => {
    if(err) {
        console.log(err)
        return
    }
        app.listen(8080, () => {
            console.log("TodoCard App is set")
        })
})  */

/* mongoose.connect("mongodb+srv://restaurant:admin@cluster0.7g34g.mongodb.net/Restaurant?retryWrites=true&w=majority", {usedNewUrlParser: true})

 */

mongoose.connect("mongodb+srv://restaurant:admin@cluster0.7g34g.mongodb.net/Restaurant?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) return 
    },
    app.listen(8080, ()=> console.log("Server up and running"))
)

// GET - An api endpoint for /ADMIN
app.get('/admin', async (req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings);
    } catch (err) {
        console.log(err)
    }
});  

// POST - An api endpoint for /RESERVATION
app.get('/reservations', async (req, res) => {
    try {
        const booking = new BookingModel(
            {
                id: 2,
                guest: 3,
                date: new Date(),
                time: 21.00,
                name: "Dada dada",
                phone: 123456,
                email: "dada@info.com"
            }
        )
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
