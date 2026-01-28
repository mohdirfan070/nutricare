const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcodeNumber:{
    type:Number,
  },
  name: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  nutrition: [
    {
      nutrient: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
      }
    }
  ],
  allergens: {
    type: [String],
    default: []
  },
  attentions: {
    type: [String]
  }
  ,
  caution: {
    type: String,
    default: ""
  },
  quantity: {
    type: String,
    required: true
  },
  image: { 
    data: Buffer,
    contentType: String 
  },
  imageName:{
    type:String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
