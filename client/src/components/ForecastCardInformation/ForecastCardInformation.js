import { Typography, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { TextCityInformation, WeatherImage } from '../CityInformation/CityInformation';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import cloudyimage from '../../assets/images/cloudy.png';
import storm from '../../assets/images/storm.png';
import sun from '../../assets/images/sun.png';
import cloudy_cloudy from '../../assets/images/cloudy_cloudy.png';

const fourDaysWeather = [
    { date: '2023-06-20', weatherImg: cloudyimage, temp: '17.64', wind: '0.73', humid: '70' },
    { date: '2023-06-21', weatherImg: storm, temp: '16.64', wind: '1.49', humid: '83' },
    { date: '2023-06-22', weatherImg: sun, temp: '14.64', wind: '2.73', humid: '72' },
    { date: '2023-06-23', weatherImg: cloudy_cloudy, temp: '15.64', wind: '0.85', humid: '89' },
    { date: '2023-06-24', weatherImg: cloudyimage, temp: '18.64', wind: '1.10', humid: '60' },
    { date: '2023-06-25', weatherImg: storm, temp: '16.84', wind: '1.60', humid: '65' },
    { date: '2023-06-26', weatherImg: sun, temp: '19.34', wind: '0.93', humid: '77' },
    { date: '2023-06-27', weatherImg: cloudy_cloudy, temp: '17.54', wind: '1.25', humid: '80' },
];

function ForecastCardInformation() {
    const [visibleCards, setVisibleCards] = useState(4);

    const handleLoadMore = () => {
        setVisibleCards((prev) => prev + 4);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>4 - Day Forecast</Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {fourDaysWeather.slice(0, visibleCards).map((infor, index) => (
                    <Box
                        key={index}
                        sx={{
                            bgcolor: '#6c757d',
                            borderRadius: '8px',
                            minHeight: '100px',
                            p: '12px',
                            mt: 1,
                            width: '150px',
                            mx: '4px',
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: 'bold', color: 'white', mb: 1, fontSize: '16px' }}
                        >
                            {infor.date}
                        </Typography>
                        <WeatherImage imgSize={48} imgSrc={infor.weatherImg} />
                        <TextCityInformation text={'Temp'} numInfor={infor.temp} />
                        <TextCityInformation text={'Wind'} numInfor={infor.wind} />
                        <TextCityInformation text={'Humidity'} numInfor={infor.humid} />
                    </Box>
                ))}
            </Box>
            {visibleCards < fourDaysWeather.length && (
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
