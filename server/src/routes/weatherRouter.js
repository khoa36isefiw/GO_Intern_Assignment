const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/WeatherController');

router.get('/next-day', weatherController.getWeatherNextDay);
router.post('/subscribe', weatherController.subscribeNewsletter);
router.post('/confirm', weatherController.confirmCode);
router.post('/unsubscribe', weatherController.unsubscribeNewsletter);

module.exports = router;
