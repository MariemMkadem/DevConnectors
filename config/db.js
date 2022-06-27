const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDb = async () => {
  try {
   await mongoose.connect(db, {
    useNewUrlParser: true
   })
    console.log('Mongo DB connected ...')
  } catch (err) {
    console.error(err.message)
    //exit process
    process.exit(1)
  }
}

module.exports = connectDb;