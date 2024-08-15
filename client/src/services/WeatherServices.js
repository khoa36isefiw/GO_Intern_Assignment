const API_URL = 'https://go-intern-assignment-api.vercel.app/api/v1/weathers';

const weatherServices = {
    getCurrentWeather: async (location) => {
        // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY
        try {
            const response = await fetch(`${API_URL}/current?q=${location}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null; // You can return null or an appropriate fallback value here
        }
    },
    getNextDayForecast: async (location) => {
        try {
            const response = await fetch(API_URL + `/next-day?q=${location}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    sendEmailSubscriber: async (email) => {
        try {
            const response = await fetch(`${API_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    },

    sendCodeConfirm: async (email, confirmationCode) => {
        try {
            const response = await fetch(`${API_URL}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, confirmationCode }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    unsubscribeMail: async (email) => {
        try {
            const response = await fetch(`${API_URL}/unsubscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    },

    saveWeatherData: async ({ cityName, weatherData }) => {
        try {
            const response = await fetch(`${API_URL}/save-weather-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cityName, weatherData }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving weather data:', error);
            throw error;
        }
    },

    getWeatherData: async (cityName) => {
        try {
            const response = await fetch(`${API_URL}/getWeatherData/${cityName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error retrieving weather data:', error);
            throw error;
        }
    },
};

export default weatherServices;
