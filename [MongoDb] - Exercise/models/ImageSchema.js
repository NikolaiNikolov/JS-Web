const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let imageSchema = new Schema({
    imageUrl: {type: String, required: true},
    imageTitle: {type: String, required: true},
    description: {type: String, required: true},
    tags: [{type:ObjectId}],
    dateC: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Image', imageSchema);