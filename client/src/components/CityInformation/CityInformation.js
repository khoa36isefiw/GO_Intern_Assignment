import { Box, Typography } from '@mui/material';
import React from 'react';
import cr from '../../assets/images/cloudy.png';
import { useSelector } from 'react-redux';
import { mobileScreen } from '../Theme/Theme';
export const TextCityInformation = ({ text, numInfor }) => {
    // check unit for Temperature, Wind, Humidity
    const getUnit = (text) => {
        switch (text) {
            case 'Temp':
            case 'Temperature':
                return '°C';
            case 'Wind':
                return 'M/S';
            case 'Humidity':
                return '%';
            default:
                return '';
        }
    };

    return (
        <Typography sx={{ color: 'white', my: 1 }}>
            {text}: {numInfor} {getUnit(text)}
        </Typography>
    );
};

export const WeatherImage = ({ imgSrc, imgSize }) => {
    return (
        <Box
            component="img"
            src={imgSrc}
            alt={'Weather Image'}
            sx={{ height: `${imgSize}px`, width: `${imgSize}px` }}
        />
    );
};

function CityInformation() {
    const getCityWeather = useSelector((state) => state.manageWeatherData.searchData);

    // Extract the date from the new API data structure
    const date =
        getCityWeather && getCityWeather.days && getCityWeather.days.length > 0
            ? getCityWeather.days[0].datetime
            : '';

    return (
        <Box
            sx={{
                borderRadius: 1,
                bgcolor: '#5472f0',
                py: '12px',
                px: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                [mobileScreen]: {},
            }}
        >
            {/* information */}
            <Box>
                {/* city name - cdatetime*/}
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
                    {getCityWeather
                        ? `${getCityWeather.resolvedAddress} (${date})`
                        : `London (2023-06-19)`}
                </Typography>
                {/* weather information of this city */}
                <TextCityInformation
                    text={'Temperature'}
                    numInfor={getCityWeather ? getCityWeather.currentConditions.temp : '17.71'}
                />
                <TextCityInformation
                    text={'Wind'}
                    numInfor={getCityWeather ? getCityWeather.currentConditions.windspeed : '5.4'}
                />
                <TextCityInformation
                    text={'Humidity'}
                    numInfor={getCityWeather ? getCityWeather.currentConditions.humidity : '54'}
                />
            </Box>
            {/* image for showing weather*/}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <WeatherImage
                    imgSrc={
                        getCityWeather
                            ? require(`../../assets/images/${getCityWeather.currentConditions.icon}.png`)
                            : cr
                    }
                    imgSize={56}
                />
                {/* <Box component="img" src={cr} sx={{ height: '56px', width: '56px' }} /> */}
                {/* type of weather */}
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                    {getCityWeather ? getCityWeather.currentConditions.conditions : 'Moderate rain'}
                </Typography>
            </Box>
        </Box>
    );
}

export default CityInformation;
