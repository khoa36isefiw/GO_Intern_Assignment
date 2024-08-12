import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveWeatherSearched } from '../../redux/weatherData/weatherDataAction';

function SearchLocation() {
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');

    const [weatherData, setWeatherData] = useState('');
    const [error, setError] = useState(null);

    // get weather data from type name of city
    const handleSearch = async () => {
        try {
            setError(null);
            const apiKey = 'f9f0c2fd732e4ba89ed35335241208';
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,
            );
            setWeatherData(response.data);
            dispatch(saveWeatherSearched(response.data));
        } catch (err) {
            setError('Unable to fetch weather data. Please try again.');
            console.error(err);
        }
    };

    console.log('weatherData: ', weatherData);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Enter a City Name</Typography>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Example: New York, Tokyo, Soul"
                value={cityName}
                // value current value in text field
                onChange={(e) => setCityName(e.target.value)}
                sx={{
                    mb: 2,
                    '.MuiInputBase-root': {
                        fontSize: '14px',
                        height: '40px',
                    },
                    '& .MuiFormHelperText-root': {
                        fontSize: '12.5px',
                        color: 'red',
                        mx: 1,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#333',
                        },
                        '&:hover fieldset': {
                            borderColor: '#333',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#333',
                        },
                    },
                }}
            />

            <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, fontWeight: 'bold', textTransform: 'initial' }}
                onClick={handleSearch}
            >
                Search
            </Button>

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ height: '1px', width: '50%', bgcolor: '#6c757d' }} />
                <Typography sx={{ mx: 2, fontSize: '16px' }}>or</Typography>
                <Box sx={{ height: '1px', width: '50%', bgcolor: '#6c757d' }} />
            </Box>
            {/* Thêm nút hoặc icon "Use Current Location" */}
            <Button
                variant="outlined"
                startIcon={<LocationOnIcon />}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                    bgcolor: '#6c757d',
                    fontWeight: 'bold',
                    color: '#fff',
                    textTransform: 'initial',
                    borderColor: '#6c757d',
                    '&:hover': {
                        bgcolor: '#6c757d',
                    },
                }}
            >
                Use Current Location
            </Button>
            {/* subscribe to get information */}
            <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
                    Sign up for daily weather forecast news
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Your mail..."
                        sx={{
                            '.MuiInputBase-root': {
                                fontSize: '14px',
                                height: '40px',
                            },
                            '& .MuiFormHelperText-root': {
                                fontSize: '12.5px',
                                color: 'red',
                                mx: 1,
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#333',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#333',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#333',
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            fontWeight: 'bold',
                            bgcolor: '#5472f0',
                            textTransform: 'initial',
                            ml: 1,
                            py: 1,
                        }}
                    >
                        Subscribe
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SearchLocation;
