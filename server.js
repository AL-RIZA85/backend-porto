const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Message = require('./models/Message')

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/portofolio')
    .then(() => {
        console.log('Connected to MongoDB')
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
            success: false
        })

    }

})


// GET MESSAGE
app.get('/messages', async (req, res) => {

    const messages = await Message.find()

    res.json(messages)

})


app.listen(3000, () => {
    console.log('Server running')
})