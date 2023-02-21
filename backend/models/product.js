const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [400, 'product name cannot exced 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [9, 'product price cannot exced 9 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings:{
        type: Number,
        default: 0
    },
    // when we use multiple images we give first array and in array we give object 
    images:[
        {
            // we give public id because we use third party image and videos
          public_id:{
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          },
        }
    ],
    category: {
        type: String,
        required:[true, 'Please select category for this product'],
        enum: {
            values:[
            'Electronics',
            'Cameras',
            'Garments',
            'Headphones',
            'WireLess',
            'Mobile',
            'Food',
            'Clothes',
            'Bluetooth',
            'Microphone',
            'Laptops',
            'Remote',
            'Game',
            'Plastic',
            'Stand',
            'Women garments',
            'Men garments',
            'Accessories',
            'Books',
            'Shoes',
            'Beauty',
            'Health',
            'Sports',
            'Lead',
            'Natural products',
            'Medicine',
            'Outdoor',
            'Stationary',
            'Bags',
            'LaptopBags',
            'Heels',
            'BodyCare',
            'Grocery',
            'Watches',
            'Speaker'
        ],
        message: 'Please select correct category for your product'
     }
    },
    seller:{
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock:{
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Please name cannot exced 5 characters'],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {   user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Product', productSchema);