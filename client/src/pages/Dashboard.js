import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SearchLocation from '../components/SearchLocation/SearchLocation';
import CityInformation from '../components/CityInformation/CityInformation';
import ForecastCardInformation from '../components/ForecastCardInformation/ForecastCardInformation';
import GetCurrentLocation from '../utils/GetCurrentLocation';
import getCityFromCoordinates from '../utils/GetCityName';
import { mobileScreen } from '../components/Theme/Theme';

function Dashboard() {
    const [currentCityName, setCurrentCityName] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);

    console.log('currentWeather: ', currentWeather);

    useEffect(() => {
        GetCurrentLocation()
            .then(async (currentPosition) => {
                // get name city from coordinates because the
                // coordinates of weatherapi difference with gg map so the weather not correct.
                const cityName = await getCityFromCoordinates(
                    currentPosition.lat,
                    currentPosition.lon,
                );
                setCurrentCityName(cityName);
                // weatherServices
                //     .getCurrentWeather(cityName)
                //     .then((data) => setCurrentWeather(data))
                //     .catch((error) => {
                //         console.log('Error occurred while retrieving location:', error);
                //     });
            })
            .catch((error) => {
                console.log('Error occurred while retrieving location:', error);
            });
    }, []);

    // useEffect(() => {
    //     currentCityName &&
    //         weatherServices
    //             .getCurrentWeather(currentCityName)
    //             .then((data) => {
    //                 if (!data.error) setCurrentWeather(data);
    //             })
    //             .catch((error) => {
    //                 console.log('Error occurred while retrieving location:', error);
    //             });
    // }, [currentCityName]);

    return (
        <Box
            sx={{
                // backgroundImage: `url(${background})`,
                minHeight: '150vh',
                // backgroundSize: 'cover', // Đảm bảo ảnh nền phủ toàn bộ màn hình
                // backgroundPosition: 'center',
                bgcolor: '#e3f2fd',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#5472f0',
                    height: '80px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '30px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    Weather Dashboard
                </Typography>
            </Box>

            <Grid container spacing={8} sx={{ padding: 16, [mobileScreen]: { padding: 0 } }}>
                <Grid item xs={4}>
                    <SearchLocation />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CityInformation />
                        </Grid>
                        <Grid item xs={12}>
                            {/* the weather's information within 4-day */}
                            <ForecastCardInformation />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
