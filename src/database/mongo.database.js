const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => console.log('mongodb connected'))
  .catch(err => console.error(err.message));

module.exports = mongoose.connection;