const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Course = new Schema({
   name: {
      type: String
   },
   module: {
      type: String
   },
   description: {
      type: String
   },
   
}, {
   collection: 'courses'
})

module.exports = mongoose.model('Course', Course)