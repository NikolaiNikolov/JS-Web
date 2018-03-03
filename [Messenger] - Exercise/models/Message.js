const mongoose = require('mongoose');
const Schema = mongoose.Schema;

messageSchema = new Schema({
    content: {
        type: Schema.Types.String,
        required: true,
        min: 1000
    },
    thread: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Thread'
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

