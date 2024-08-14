const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribed: { type: Boolean, default: true },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
