const express = require('express')
const cors = require('cors')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')

const app = express()
const port = process.env.PORT || 8000
const connectionString = process.env.connectionString
const Schema = mongoose.Schema

//middlewares
app.use(cors())
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/posts', postRoutes)

mongoose.connect( connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
.then( res => {
    console.log("MongoDB Atlas Connected")
})
.catch( err => {
    console.error(`Error connecting to MongoDB Atlas ${err}`)
})


app.listen( port, () => {
    console.log(`Listening on http://localhost:${port}`)
})