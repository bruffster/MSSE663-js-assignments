const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './config.env') })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log(`Mongo DB Connected: ${conn.connection.host}`)
  } catch (err)  {
    console.log(err);
    process.exit();
  }
}

module.exports = connectDB;