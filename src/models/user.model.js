const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    lists: [
      {
        title: { type: String, required: false },
        tasks: [
          {
            description: { type: String, required: false },
            done: { type: Boolean, required: false }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', user);