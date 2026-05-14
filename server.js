require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Message = require('./models/Message')

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err)
    });


// SEND MESSAGE
app.post('/api/messages', async (req, res) => {

    try {

        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })

        await newMessage.save()

        res.json({
            success: true,
            message: 'Pesan terkirim'
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        })

    }

})


// GET MESSAGE
app.get('/messages', async (req, res) => {

    try {

        const messages = await Message.find()

        res.json(messages)

    } catch (err) {

        res.status(500).json({
            success: false
        })

    }

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})