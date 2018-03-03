const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let threadSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    createdOn: { type: Schema.Types.Date, default: Date.now() }
});

module.exports = mongoose.model('Thread', threadSchema);