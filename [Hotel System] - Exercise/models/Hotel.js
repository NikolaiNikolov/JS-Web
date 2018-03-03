const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let hotelSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    category: {
      type: ObjectId,
      required: true,
      ref: 'Category'
    },
    location: {
        type: Schema.Types.String,
        required: true
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true
    },
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    comments: [{
        type: ObjectId,
        default: [],
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Hotel', hotelSchema);