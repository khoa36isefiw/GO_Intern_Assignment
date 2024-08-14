const API_URL = 'http://localhost:3001/api/v1/weathers';

// REACT_APP_BASE_URL = 'https://api.weatherapi.com/';
//  REACT_APP_API_URL = "http://localhost:3001/api/v1"

// `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,

const weatherServices = {
    getNextDayForecast: async (location, days) => {
        const normLocation = location.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        try {
            const response = await fetch(API_URL + `/next-day?q=${normLocation}&days=${days}`);
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
};

export default weatherServices;
