import { Box, Typography } from '@mui/material';
import React from 'react';
import cr from '../../assets/images/cloudy_rainy.png';
import { useSelector } from 'react-redux';
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
    // console.log('data get from redux: ', getCityWeather && getCityWeather);
    // handle for localtime: '2024-08-12 19:08' --> convert to 2024-08-12
    const localtime = getCityWeather && getCityWeather?.location.localtime;
    const date = localtime ? localtime.split(' ')[0] : '';

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
            }}
        >
            {/* information */}
            <Box>
                {/* city name - cdatetime*/}
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
                    {getCityWeather
                        ? `${getCityWeather.location.name} ${date}`
                        : `London (2023-06-19)`}
                </Typography>
                {/* weather information of this city */}
                <TextCityInformation
                    text={'Temperature'}
                    numInfor={getCityWeather ? getCityWeather.current.temp_c : '17.71'}
                />
                <TextCityInformation
                    text={'Wind'}
                    numInfor={getCityWeather ? getCityWeather.current.wind_mph : '5.4'}
                />

                <TextCityInformation
                    text={'Humidity'}
                    numInfor={getCityWeather ? getCityWeather.current.humidity : '54'}
                />
            </Box>
            {/* image for showing weather*/}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <WeatherImage
                    imgSrc={getCityWeather ? getCityWeather.current.condition.icon : cr}
                    imgSize={56}
                />
                {/* <Box component="img" src={cr} sx={{ height: '56px', width: '56px' }} /> */}
                {/* type of weather */}
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                    {getCityWeather ? getCityWeather.current.condition.text : 'Moderate rain'}
                </Typography>
            </Box>
        </Box>
    );
}

export default CityInformation;
