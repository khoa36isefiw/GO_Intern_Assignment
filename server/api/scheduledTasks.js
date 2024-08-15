// api/scheduledTasks.js
import WeatherController from '../../controllers/WeatherController';

export default async function handler(req, res) {
    try {
        await WeatherController.sendDailyWeatherUpdates();
        res.status(200).json({ message: 'Weather updates sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send weather updates' });
    }
}
