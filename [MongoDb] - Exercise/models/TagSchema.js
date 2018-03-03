const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let tagSchema = new Schema({
    tagName: {type: String, required: true},
    // creationDate: {type: Date, required: true},
    images: [{type:ObjectId, ref: "Image"}]
});

tagSchema.pre('save', function (next) {
    this.tagName = this.tagName.toLowerCase();
    next();
});

module.exports = mongoose.model('Tag', tagSchema);