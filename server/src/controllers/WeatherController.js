require('dotenv').config();
const nodemailer = require('nodemailer'); // for sending email

const Subscriber = require('../models/Subscriber');
const fetch = require('node-fetch');
const WeatherHistory = require('../models/WeatherHistory');

const WEATHER_API_URL =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = 'YX4WSDKJ8LQ9QF3P9K3MYBDHV';

const confirmationCodes = {};

const WeatherController = {
    getCurrentWeather: async (req, res) => {
        const location = req.query.q;
        try {
            const weatherFetch = await fetch(
                `${WEATHER_API_URL}${location}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`,
            );
            const weatherData = await weatherFetch.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error fetching weather data');
        }
    },

    getWeatherNextDay: async (req, res) => {
        const location = req.query.q;

        try {
            const weatherFetch = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location},UK?key=${process.env.WEATHER_API_KEY} `,
            );

            const weatherData = await weatherFetch.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error fetching forecast data');
        }
    },

    generateRandomCode: () => {
        let code = '';
        for (let i = 0; i < 6; i++) {
            // generate a random digit (0-9)
            code += Math.floor(Math.random() * 10);
        }
        return code;
    },

    subscribeNewsletter: async (req, res) => {
        try {
            const { email } = req.body;
            console.log(`Email to subscribe: ${email}`);

            // check if email already exists in database
            const existingUser = await Subscriber.findOne({ email: email });
            if (existingUser) {
                // if email existed, return message like:
                return res.status(400).json({
                    error: true,
                    message: 'This email is already subscribed to the newsletter.',
                });
            }

            // if email does not exist, continue sending confirmation code
            const confirmationCode = WeatherController.generateRandomCode();
            confirmationCodes[email] = confirmationCode;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'timdospl456@gmail.com',
                    pass: 'swmu kewr qzix ahgw',
                },
            });

            const mailOptions = {
                from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
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

    confirmCode: async (req, res) => {
        const { email, confirmationCode } = req.body;
        if (confirmationCodes[email] === confirmationCode) {
            delete confirmationCodes[email];

            // save email to database
            await Subscriber.findOneAndUpdate(
                { email },
                { subscribed: true },
                { upsert: true, new: true },
            );

            // Respond to the user
            res.status(200).json({
                error: false,
                message: 'Email confirmed. You are now subscribed to weather reports.',
            });

            //  send welcome email with current weather
            const location = 'London';
            try {
                console.log('Fetching weather data...');
                const weatherFetch = await fetch(
                    `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
                );
                const weatherData = await weatherFetch.json();
                console.log('Weather data fetched:', weatherData);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'timdospl456@gmail.com',
                        pass: 'swmu kewr qzix ahgw',
                    },
                });
                const mailOptions = {
                    from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
                    to: email,
                    subject: 'Welcome to Weather Reports',
                    html: `
                        <p>Thank you for subscribing! You will receive daily weather updates.</p>
                        <p>Current weather in ${location}:</p>
                        <p>Temperature: ${weatherData.currentConditions.temp}°C</p>
                        <p>Condition: ${weatherData.currentConditions.conditions}</p>
                        <p>Wind Speed: ${weatherData.currentConditions.windspeed} km/h</p>
                        <p>Humidity: ${weatherData.currentConditions.humidity}%</p>
                    `,
                };
                await transporter.sendMail(mailOptions);
                console.log('Welcome email sent.');
            } catch (error) {
                console.error('Error fetching weather data for welcome email:', error);
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Invalid confirmation code.',
            });
        }
    },

    sendDailyWeatherUpdates: async () => {
        try {
            const subscribersList = await Subscriber.find({ subscribed: true });
            const location = 'London'; // send weather news in London :>
            console.log('Fetching new weather data...');

            const weatherFetch = await fetch(
                `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
            );

            // console.log('weatherFetch: ', weatherFetch);

            // check if the response is OK (status 200)
            if (!weatherFetch.ok) {
                console.error(`Error fetching weather data: ${weatherFetch.statusText}`);
                return;
            }

            // get the response as text first
            const weatherData = await weatherFetch.text();
            try {
                const parsedWeatherData = JSON.parse(weatherData);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'timdospl456@gmail.com',
                        pass: 'swmu kewr qzix ahgw',
                    },
                });

                for (const subscriber of subscribersList) {
                    const mailOptions = {
                        from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
                        to: subscriber.email,
                        subject: 'Daily Weather Update',
                        html: `
                            <p>Current weather in ${location}:</p>
                            <p>Temperature: ${parsedWeatherData.currentConditions.temp}°C</p>
                            <p>Condition: ${parsedWeatherData.currentConditions.conditions}</p>
                            <p>Wind Speed: ${parsedWeatherData.currentConditions.windspeed} km/h</p>
                            <p>Humidity: ${parsedWeatherData.currentConditions.humidity}%</p>
                        `,
                    };
                    await transporter.sendMail(mailOptions);
                }
            } catch (parseError) {
                console.error('Error parsing weather data:', parseError);
                console.error('Weather data response:', weatherData); // Log the raw response for further inspection
            }
        } catch (error) {
            console.error('Error sending daily weather updates:', error);
        }
    },

    // unsubscribe email
    unsubscribeNewsletter: async (req, res) => {
        try {
            const { email } = req.body;
            console.log('Received email:', email); // log the received email

            if (!email) {
                return res.status(400).json({
                    error: true,
                    message: 'Email is required.',
                });
            }
            // find and delete the subscriber from the database
            const result = await Subscriber.findOneAndDelete({ email });

            if (result) {
                res.status(200).json({
                    error: false,
                    message: `You have successfully unsubscribed.`,
                });
            } else {
                res.status(404).json({
                    error: true,
                    message: `No subscription found for ${email}.`,
                });
            }
        } catch (err) {
            console.log('Error unsubscribing: ', err);
            res.status(500).json({
                error: true,
                message: 'An error occurred while unsubscribing.',
            });
        }
    },

    saveWeatherData: async (req, res) => {
        const { cityName, weatherData } = req.body;
        const timestamp = new Date();
        const weatherHistory = new WeatherHistory({
            cityName: cityName,
            weatherData: weatherData,
            timestamp: timestamp,
        });

        try {
            await weatherHistory.save();
            res.status(200).json({ message: 'Weather data saved successfully!' });
        } catch (err) {
            console.log('Error saving weather data: ', err);
            res.status(500).json({
                error: true,
                message: 'An error occurred while saving weather data',
            });
        }
    },

    getWeatherData: async (req, res) => {
        const { cityName } = req.params;
        try {
            const weatherHistory = await WeatherHistory.findOne({
                cityName,
                timestamp: {
                    $gte: new Date().setHours(0, 0, 0, 0),
                    $lt: new Date().setHours(23, 59, 59, 999),
                },
            });

            if (weatherHistory) {
                res.status(200).json(weatherHistory.weatherData);
            } else {
                // fetch new data from external API if not in history
                const apiKey = process.env.WEATHER_API_KEY;
                const apiResponse = await axios.get(
                    `${WEATHER_API_URL}${cityName}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`,
                );

                const newWeatherData = apiResponse.data;

                // save the new data to the db
                const newWeatherHistory = new WeatherHistory({
                    cityName,
                    weatherData: newWeatherData,
                    timestamp: new Date(),
                });
                await newWeatherHistory.save();

                res.status(200).json(newWeatherData);
            }
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch weather data.' });
        }
    },
};

module.exports = WeatherController;
