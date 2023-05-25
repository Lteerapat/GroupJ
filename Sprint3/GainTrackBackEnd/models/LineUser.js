const mongoose = require('mongoose');
const lineuserSchema = new mongoose.Schema({
  lineId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});
const LineUser = mongoose.model('LineUser', lineuserSchema);
module.exports = LineUser;