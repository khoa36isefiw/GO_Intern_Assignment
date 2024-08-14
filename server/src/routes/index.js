const API_URL_VER = '/api/v1';
// const API_URL_VER = 'http://localhost:3001/api/v1';
const weatherRouter = require('./weatherRouter');

function route(app) {
    app.use(`${API_URL_VER}/weathers`, weatherRouter);
    app.use('/', (req, res) => {
        res.send('Weather Forecast App O_o');
    });
}

module.exports = route;
