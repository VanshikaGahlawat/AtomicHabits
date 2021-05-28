const mongoose = require('mongoose')

const connectDB =  async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true})
        console.log('MongoDB connected');

    } catch (err) {
        console.log({error: err.message});
        process.exit(1);
    }
}

module.exports = connectDB