require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//     cors({
//         // chỉ http://localhost:3001 này mới truy xuất vào server
//         // origin: ['http://localhost:3000', '*'], // tất cả có thể truy xuất vào server
//         origin: ['http://localhost:3000', 'http://localhost:3001'],
//         methods: 'GET,POST,PUT,PATCH,DELETE', // Cho phép các phương thức GET và POST
//         allowedHeaders: 'Content-Type,Authorization', // Cho phép các tiêu đề yêu cầu cụ thể
//         credentials: true, // Cho phép truy cập với thông tin chứng thực
//     }),
// );

app.use(cors());

route(app);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
