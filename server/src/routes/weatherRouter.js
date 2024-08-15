const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/WeatherController');

router.get('/current', weatherController.getCurrentWeather);
router.get('/next-day', weatherController.getWeatherNextDay);
router.post('/subscribe', weatherController.subscribeNewsletter);
router.post('/confirm', weatherController.confirmCode);
router.post('/unsubscribe', weatherController.unsubscribeNewsletter);
router.post('/ve-weather-data', weatherController.saveWeatherData);
router.get('/getWeatherData/:cityName', weatherController.getWeatherData);

module.exports = router;
