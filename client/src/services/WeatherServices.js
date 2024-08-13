const API_URL = 'http://localhost:3001/api/v1/weathers';
// const API_URL = `${process.env.REACT_APP_API_URL}/weathers`;
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

    
};

export default weatherServices;
