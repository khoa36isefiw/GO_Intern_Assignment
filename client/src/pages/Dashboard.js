import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SearchLocation from '../components/SearchLocation/SearchLocation';
import CityInformation from '../components/CityInformation/CityInformation';
import ForecastCardInformation from '../components/ForecastCardInformation/ForecastCardInformation';
import { ipadProScreen, mobileScreen, tabletScreen } from '../components/Theme/Theme';

function Dashboard() {
    return (
        <Box
            sx={{
                minHeight: '150vh',
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
                    [mobileScreen]: {
                        height: '60px',
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: '30px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        [mobileScreen]: {
                            fontSize: '24px',
                        },
                    }}
                >
                    Weather Dashboard
                </Typography>
            </Box>

            <Grid
                container
                spacing={8}
                sx={{
                    padding: 16,
                    [mobileScreen]: { padding: 1, mt: 1 },
                    [ipadProScreen]: {
                        padding: 2,
                        mt: 3,
                    },
                    [tabletScreen]: {
                        padding: 2,
                        mt: 4,
                    },
                }}
            >
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <SearchLocation />
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8}>
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
