require('dotenv').config();
const nodemailer = require('nodemailer'); // for sending email

// `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,
const WEATHER_API_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'f9f0c2fd732e4ba89ed35335241208';
const confirmationCodes = {};

const WeatherController = {
    getCurrentWeather: async (req, res) => {
        const location = req.query.q;
        try {
            const weatherFetch = await fetch(
                `${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`,
            );
            const weatherData = await weatherFetch.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
        }
    },

    getDailyWeather: async (req, res) => {
        const location = req.query.q;
        const date = req.query.dt; // format 'yyyy-MM-dd'
        try {
            const weatherFetch = await fetch(
                `${WEATHER_API_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}&aqi=no`,
            );
            const weatherData = await weatherFetch.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
        }
    },

    getWeatherNextDay: async (req, res) => {
        const location = req.query.q;
        const numDay = req.query.days;
        try {
            const weatherFetch = await fetch(
                `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${numDay}&aqi=no`,
            );
            const weatherData = await weatherFetch.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
        }
    },

    generateRandomCode: () => {
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        }
        return code;
    },

    subscribeNewsletter: async (req, res) => {
        try {
            const { email } = req.body;
            console.log(email);
            const confirmationCode = WeatherController.generateRandomCode();
            confirmationCodes[email] = confirmationCode;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'thoaifamily83@gmail.com',
                    pass: 'jjzb dbwl lvkv mjod',
                },
            });
            const mailOptions = {
                from: `weather-forecast-newsletter<thoaifamily83@gmail.com"`,
                to: email,
                subject: 'Confirm your subscription to Weather Reports',
                html: `<p>Please use the following code to confirm your subscription: <b>${confirmationCode}</b></p>`,
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({
                error: false,
                message: 'A confirmation code has been sent to your email address.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: true,
                message: 'An error occurred while sending the confirmation email.',
            });
        }
    },

    confirmCode: (req, res) => {
        const { email, confirmationCode } = req.body;
        if (confirmationCodes[email] === confirmationCode) {
            delete confirmationCodes[email];
            // save email to database
            res.status(200).json({
                error: false,
                message: 'Email confirmed. You are now subscribed to weather reports.',
            });
        } else {
            res.status(400).json({
                error: true,
                message: 'Invalid confirmation code.',
            });
        }
    },
};

module.exports = WeatherController;
