const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const feedRoutes = require('./routes/feedRoutes')
const postRoutes = require('./routes/postRoutes')
const activityRoutes = require('./routes/activityRoutes')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/activity', activityRoutes)


const PORT = process.env.PORT || 5000 

app.listen(PORT, ()=>{
    console.log("Server Running...")
})