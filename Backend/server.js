const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const mongoose = require('mongoose')
const userRoute = require('./Routes/userRoutes')

const app = express()

app.use(express.json())

// MONGODB CONNECT
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD)
mongoose.connect(DB).then(con => {
    console.log('Connected')
})

app.use('/api/v1/users', userRoute)

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err
    })    
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Working')
})


