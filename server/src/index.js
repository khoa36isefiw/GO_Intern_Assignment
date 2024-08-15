require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cron = require('node-cron');
const WeatherController = require('./controllers/WeatherController');

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://go-intern-assignment-ui.vercel.app',
            'https://go-intern-assignment-api.vercel.app',
        ],
        methods: 'GET,POST,PUT,PATCH,DELETE', // Cho phép các phương thức GET và POST
        allowedHeaders: 'Content-Type,Authorization', // Cho phép các tiêu đề yêu cầu cụ thể
        credentials: true, // Cho phép truy cập với thông tin chứng thực
    }),
);

app.use(cors());

// Schedule to send after 2 seconds
cron.schedule('*/2 * * * * ', () => {
    // */2 * * * *  send after 2mins
    WeatherController.sendDailyWeatherUpdates();
});

// connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

route(app);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
