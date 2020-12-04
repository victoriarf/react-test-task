const {Schema, model, ObjectId} = require('mongoose');

const productSchema = new Schema({
  id: {type: ObjectId, unique: true},
  media: [Object],
  name: {type: String},
  order: {type: Number},
  vendor: {type: String, required: true}
});

module.exports = model('Product', productSchema);