const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')
const feedRoutes = require('./routes/feedRoutes')

const app = express()
app.use(express.json())
dotenv.config()

app.use('/api/users', userRoutes)
app.use('api/activity', activityRoutes)
app.use('/api/posts', feedRoutes)



const PORT = process.env.PORT || 5000 

app.listen(PORT, ()=>{
    console.log("Server Running...")
})