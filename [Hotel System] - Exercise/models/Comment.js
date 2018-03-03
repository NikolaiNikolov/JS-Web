const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let commentSchema = new Schema({
    creator: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    hotel: {
        type: ObjectId,
        required: true,
        ref: 'Hotel'
    },
    comment: {
        type: Schema.Types.String,
        required: true
    },
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', commentSchema);