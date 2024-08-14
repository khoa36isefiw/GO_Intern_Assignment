const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Thông tin email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'timdospl456@gmail.com',
        pass: 'swmu kewr qzix ahgw', // Thay bằng biến môi trường hoặc phương pháp bảo mật
    },
});

// URL và API key cho dịch vụ thời tiết
const API_KEY = 'f9f0c2fd732e4ba89ed35335241208';
const WEATHER_API_URL =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Giả sử bạn lưu trữ người đăng ký trong một đối tượng
const subscribers = {}; // Thay thế bằng cơ sở dữ liệu thực sự

// Hàm gửi email dự báo thời tiết
const sendWeatherUpdate = async (email) => {
    try {
        // Lấy thông tin thời tiết
        const weatherFetch = await fetch(
            `${WEATHER_API_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
        );

        const weatherData = await weatherFetch.json();

        // Soạn nội dung email
        const mailOptions = {
            from: 'weather-forecast-newsletter <timdospl456@gmail.com>',
            to: email,
            subject: 'Daily Weather Update',
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
        console.log(`Weather update sent to ${email}`);
    } catch (error) {
        console.error(`Error sending weather update to ${email}: ${error}`);
    }
};

// Thiết lập cron job để gửi email hàng ngày vào lúc 8:00 AM
cron.schedule('*/5 * * * * * *', () => {
    console.log('Running daily email job');

    // Lặp qua danh sách người đăng ký và gửi email
    for (const email in subscribers) {
        if (subscribers[email].subscribed) {
            sendWeatherUpdate(email);
        }
    }
});
