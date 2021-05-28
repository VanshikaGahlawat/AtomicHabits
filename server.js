const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const feedRoutes = require('./routes/feedRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/posts', postRoutes)


const PORT = process.env.PORT || 5000 

app.listen(PORT, ()=>{
    console.log("Server Running...")
})