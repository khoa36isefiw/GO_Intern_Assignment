// require('dotenv').config();
// const nodemailer = require('nodemailer'); // for sending email
// const mongoose = require('mongoose');
// const Subscriber = require('../models/Subscriber');

// // `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,
// // const WEATHER_API_URL = 'https://api.weatherapi.com/v1';

// const WEATHER_API_URL =
//     'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// const API_KEY = 'f9f0c2fd732e4ba89ed35335241208';
// // const WEATHER_API_URL = process.env.WEATHER_API_URL;
// // const API_KEY = process.env.WEATHER_API_KEY;
// // console.log('in server: ', API_KEY);
// // console.log('WEATHER_API_URL: ', WEATHER_API_URL);
// const confirmationCodes = {};
// const subscribers = {};

// const WeatherController = {
//     getCurrentWeather: async (req, res) => {
//         const location = req.query.q;
//         try {
//             const weatherFetch = await fetch(
//                 `${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`,
//             );
//             const weatherData = await weatherFetch.json();
//             res.send(weatherData);
//         } catch (error) {
//             console.log(error);
//         }
//     },

//     getDailyWeather: async (req, res) => {
//         const location = req.query.q;
//         const date = req.query.dt; // format 'yyyy-MM-dd'
//         try {
//             const weatherFetch = await fetch(
//                 `${WEATHER_API_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}&aqi=no`,
//             );
//             const weatherData = await weatherFetch.json();
//             res.send(weatherData);
//         } catch (error) {
//             console.log(error);
//         }
//     },

//     getWeatherNextDay: async (req, res) => {
//         const location = req.query.q;
//         const numDay = req.query.days;
//         try {
//             const weatherFetch = await fetch(
//                 `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${numDay}&aqi=no`,
//             );
//             const weatherData = await weatherFetch.json();
//             res.send(weatherData);
//         } catch (error) {
//             console.log(error);
//         }
//     },

//     generateRandomCode: () => {
//         let code = '';
//         for (let i = 0; i < 6; i++) {
//             code += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
//         }
//         return code;
//     },

//     subscribeNewsletter: async (req, res) => {
//         try {
//             const { email } = req.body;
//             console.log(`Email to subscribe: ${email}`);
//             const confirmationCode = WeatherController.generateRandomCode();
//             confirmationCodes[email] = confirmationCode;
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: 'timdospl456@gmail.com',
//                     pass: 'swmu kewr qzix ahgw',
//                 },
//             });
//             const mailOptions = {
//                 from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
//                 to: email,
//                 subject: 'Confirm your subscription to Weather Reports',
//                 html: `<p>Please use the following code to confirm your subscription: <b>${confirmationCode}</b></p>`,
//             };
//             await transporter.sendMail(mailOptions);
//             res.status(200).json({
//                 error: false,
//                 message: 'A confirmation code has been sent to your email address.',
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({
//                 error: true,
//                 message: 'An error occurred while sending the confirmation email.',
//             });
//         }
//     },

//     // confirmCode: (req, res) => {
//     //     const { email, confirmationCode } = req.body;
//     //     if (confirmationCodes[email] === confirmationCode) {
//     //         delete confirmationCodes[email];
//     //         // save email to database
//     //         res.status(200).json({
//     //             error: false,
//     //             message: 'Email confirmed. You are now subscribed to weather reports.',
//     //         });
//     //     } else {
//     //         res.status(400).json({
//     //             error: true,
//     //             message: 'Invalid confirmation code.',
//     //         });
//     //     }
//     // },

//     // confirmCode: async (req, res) => {
//     //     const { email, confirmationCode } = req.body;
//     //     if (confirmationCodes[email] === confirmationCode) {
//     //         delete confirmationCodes[email];

//     //         // Save email to database or in-memory store
//     //         subscribers[email] = { subscribed: true }; // Add additional user preferences if needed

//     //         // Respond to the user
//     //         res.status(200).json({
//     //             error: false,
//     //             message: 'Email confirmed. You are now subscribed to weather reports.',
//     //         });

//     //         // Optionally, trigger a welcome email
//     //         const transporter = nodemailer.createTransport({
//     //             service: 'gmail',
//     //             auth: {
//     //                 user: 'timdospl456@gmail.com',
//     //                 pass: 'swmu kewr qzix ahgw',
//     //             },
//     //         });
//     //         const mailOptions = {
//     //             from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
//     //             to: email,
//     //             subject: 'Welcome to Weather Reports',
//     //             html: '<p>Thank you for subscribing! You will receive daily weather updates.</p>',
//     //         };
//     //         await transporter.sendMail(mailOptions);
//     //     } else {
//     //         res.status(400).json({
//     //             error: true,
//     //             message: 'Invalid confirmation code.',
//     //         });
//     //     }
//     // },

//     confirmCode: async (req, res) => {
//         const { email, confirmationCode } = req.body;
//         if (confirmationCodes[email] === confirmationCode) {
//             delete confirmationCodes[email];

//             // Save email to database
//             // Save email to database
//             await Subscriber.findOneAndUpdate(
//                 { email },
//                 { subscribed: true },
//                 { upsert: true, new: true },
//             );

//             // Respond to the user
//             res.status(200).json({
//                 error: false,
//                 message: 'Email confirmed. You are now subscribed to weather reports.',
//             });

//             // Send welcome email with current weather
//             const location = 'London'; // Replace with the actual preferred location
//             try {
//                 console.log('chạy đi bé iu...');
//                 const weatherFetch = await fetch(
//                     `${WEATHER_API_URL}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
//                 );
//                 const weatherData = await weatherFetch.json();

//                 const transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: 'timdospl456@gmail.com',
//                         pass: 'swmu kewr qzix ahgw', // Replace with actual email password or use OAuth2
//                     },
//                 });
//                 const mailOptions = {
//                     from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
//                     // to: email,
//                     to: 'banonly238@gmail.com',
//                     subject: 'Welcome to Weather Reports',
//                     html: `
//                         <p>Thank you for subscribing! You will receive daily weather updates.</p>
//                         <p>Current weather in ${location}:</p>
//                         <p>Temperature: ${weatherData.currentConditions.temp}°C</p>
//                         <p>Condition: ${weatherData.currentConditions.conditions}</p>
//                         <p>Wind Speed: ${weatherData.currentConditions.windspeed} km/h</p>
//                         <p>Humidity: ${weatherData.currentConditions.humidity}%</p>
//                     `,
//                 };
//                 await transporter.sendMail(mailOptions);
//             } catch (error) {
//                 console.error('Error fetching weather data for welcome email:', error);
//             }
//         } else {
//             res.status(400).json({
//                 error: true,
//                 message: 'Invalid confirmation code.',
//             });
//         }
//     },

//     sendDailyWeatherUpdates: async () => {
//         try {
//             const subscribersList = await Subscriber.find({ subscribed: true });
//             const location = 'London'; // Replace with the actual preferred location

//             const weatherFetch = await fetch(
//                 `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
//             );
//             const weatherData = await weatherFetch.json();

//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: 'timdospl456@gmail.com',
//                     pass: 'swmu kewr qzix ahgw',
//                 },
//             });

//             for (const subscriber of subscribersList) {
//                 const mailOptions = {
//                     from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
//                     to: subscriber.email,
//                     subject: 'Daily Weather Update',
//                     html: `
//                         <p>Current weather in ${location}:</p>
//                         <p>Temperature: ${weatherData.currentConditions.temp}°C</p>
//                         <p>Condition: ${weatherData.currentConditions.conditions}</p>
//                         <p>Wind Speed: ${weatherData.currentConditions.windspeed} km/h</p>
//                         <p>Humidity: ${weatherData.currentConditions.humidity}%</p>
//                     `,
//                 };
//                 await transporter.sendMail(mailOptions);
//             }
//         } catch (error) {
//             console.error('Error sending daily weather updates:', error);
//         }
//     },
// };

// module.exports = WeatherController;

require('dotenv').config();
const nodemailer = require('nodemailer'); // for sending email
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed

const WEATHER_API_URL =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const API_KEY = 'YX4WSDKJ8LQ9QF3P9K3MYBDHV';

const confirmationCodes = {};
const subscribers = {};
const weatherCache = {}; // In-memory store for weather information
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour in milliseconds

const WeatherController = {
    getCurrentWeather: async (req, res) => {
        const location = req.query.q;
        try {
            // Check cache first
            if (
                weatherCache[location] &&
                Date.now() - weatherCache[location].timestamp < CACHE_EXPIRY_MS
            ) {
                return res.send(weatherCache[location].data);
            }

            const weatherFetch = await fetch(
                `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
            );
            const weatherData = await weatherFetch.json();

            // Cache the result
            weatherCache[location] = {
                data: weatherData,
                timestamp: Date.now(),
            };

            res.send(weatherData);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error fetching weather data');
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
            res.status(500).send('Error fetching daily weather data');
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
            res.status(500).send('Error fetching forecast data');
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
            console.log(`Email to subscribe: ${email}`);
            const confirmationCode = WeatherController.generateRandomCode();
            confirmationCodes[email] = confirmationCode;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'timdospl456@gmail.com',
                    pass: 'swmu kewr qzix ahgw', // Replace with actual email password or use OAuth2
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

            // Save email to database
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

            // Immediately send welcome email with current weather
            const location = 'London'; // Replace with the actual preferred location
            try {
                console.log('Fetching weather data...');
                const weatherFetch = await fetch(
                    `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
                );
                const weatherData = await weatherFetch.json();
                console.log('Weather data fetched:', weatherData);

                // Cache the result
                weatherCache[location] = {
                    data: weatherData,
                    timestamp: Date.now(),
                };

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'timdospl456@gmail.com',
                        pass: 'swmu kewr qzix ahgw', // Replace with actual email password or use OAuth2
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
            const location = 'London'; // Replace with the actual preferred location
            console.log('Fetching new weather data...');

            const weatherFetch = await fetch(
                `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
            );

            // console.log('weatherFetch: ', weatherFetch);

            // Check if the response is OK (status 200)
            if (!weatherFetch.ok) {
                console.error(`Error fetching weather data: ${weatherFetch.statusText}`);
                return;
            }

            const weatherData = await weatherFetch.text(); // Get the response as text first
            try {
                const parsedWeatherData = JSON.parse(weatherData); // Then attempt to parse it as JSON
                // console.log('Weather data fetched:', parsedWeatherData);

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
            console.log('Received email:', email); // Log the received email

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
};

// Schedule daily weather updates
setInterval(() => {
    WeatherController.sendDailyWeatherUpdates();
}, 24 * 60 * 60 * 2400); // Every 24 hours

module.exports = WeatherController;
