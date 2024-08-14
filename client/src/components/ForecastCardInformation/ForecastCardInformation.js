import { Typography, Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextCityInformation, WeatherImage } from '../CityInformation/CityInformation';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import cloudyimage from '../../assets/images/cloudy.png';
import rain from '../../assets/images/rain.png';
import clear_day from '../../assets/images/clear-day.png';
import partly_cloudy_night from '../../assets/images/partly-cloudy-night.png';
import { useSelector } from 'react-redux';
import weatherServices from '../../services/WeatherServices';

// Default values if no data is searched
const defaultWeatherData = [
    { date: '2023-06-20', weatherImg: cloudyimage, temp: '17.64', wind: '0.73', humid: '70' },
    { date: '2023-06-21', weatherImg: rain, temp: '16.64', wind: '1.49', humid: '83' },
    { date: '2023-06-22', weatherImg: clear_day, temp: '14.64', wind: '2.73', humid: '72' },
    {
        date: '2023-06-23',
        weatherImg: partly_cloudy_night,
        temp: '15.64',
        wind: '0.85',
        humid: '89',
    },
    { date: '2023-06-24', weatherImg: cloudyimage, temp: '18.64', wind: '1.10', humid: '60' },
    { date: '2023-06-25', weatherImg: rain, temp: '16.84', wind: '1.60', humid: '65' },
    { date: '2023-06-26', weatherImg: clear_day, temp: '19.34', wind: '0.93', humid: '77' },
    {
        date: '2023-06-27',
        weatherImg: partly_cloudy_night,
        temp: '17.54',
        wind: '1.25',
        humid: '80',
    },
];

function ForecastCardInformation() {
    const [visibleCards, setVisibleCards] = useState(4);
    const [listWeathers, setListWeathers] = useState([]);
    const locationSearched = useSelector((state) => state.manageWeatherData.searchData);

    useEffect(() => {
        if (locationSearched) {
            const weatherDays = locationSearched.days.slice(1, 10); // Get the next 9 days
            const weatherList = weatherDays.map((day) => ({
                date: day.datetime,
                temp: day.temp,
                wind: day.windspeed,
                humid: day.humidity,

                weatherImg: require(`../../assets/images/${day.icon}.png`), // Assuming this is the correct path for the weather icon
            }));
            setListWeathers(weatherList);
        } else {
            setListWeathers(defaultWeatherData); // Use default values if no search data
        }
    }, [locationSearched]);

    const handleLoadMore = () => {
        setVisibleCards((prev) => prev + 4);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>4 - Day Forecast</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {listWeathers.slice(0, visibleCards).map((infor, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box
                            sx={{
                                bgcolor: '#6c757d',
                                borderRadius: '8px',
                                minHeight: '100px',
                                p: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '16px' }}>
                                {infor.date}
                            </Typography>
                            {/* require(`../../assets/images/${getCityWeather.currentConditions.icon}.png`) */}
                            <WeatherImage imgSize={48} imgSrc={infor.weatherImg} />
                            <TextCityInformation text={'Temp'} numInfor={infor.temp} />
                            <TextCityInformation text={'Wind'} numInfor={infor.wind} />
                            <TextCityInformation text={'Humidity'} numInfor={infor.humid} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {visibleCards < listWeathers.length && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        endIcon={<KeyboardDoubleArrowRightIcon />}
                        sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px' }}
                        onClick={handleLoadMore}
                    >
                        Load More
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default ForecastCardInformation;
