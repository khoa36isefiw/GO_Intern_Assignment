const mongoose = require('mongoose');

const weatherHistorySchema = new mongoose.Schema({
    cityName: { type: String, required: true },
    weatherData: { type: Object, required: true },
    timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('WeatherHistory', weatherHistorySchema);
