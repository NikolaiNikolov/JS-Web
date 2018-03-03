const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema({
    imageUrl: {
        type: Schema.Types.String,
        required: [true, 'Image URL is required'],
    },
    size: {
        type: Schema.Types.Number,
        required: [true, 'Size is required'],
        min: [17, 'Invalid size'],
        max: [24, 'Invalid size']
    },
    createdOn: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    category: {
        type: Schema.Types.String
    },
    toppings: []
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
