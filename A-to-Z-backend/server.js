const mongoose = require('mongoose');
const dotenv = require('dotenv')
 dotenv.config({path: './config.env'})
 const app = require('./app.js')

// creating server at port 3000
DB = process.env.DB_URL.replace('<db_password>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => {
    console.log('connected to the database')
})
const port = process.env.PORT || 3000
app.listen(port , () => {
    console.log(`server is running on ${port}`)
})