import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveWeatherSearched } from '../../redux/weatherData/weatherDataAction';
import weatherServices from '../../services/WeatherServices';
import UnsubscribeMail from '../UnsubscribeMail/UnsubscribeMail';

function SearchLocation() {
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState('');

    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London?unitGroup=metric&include=current&key=YX4WSDKJ8LQ9QF3P9K3MYBDHV&contentType=json
    const handleSearch = async () => {
        // initial
        try {
            setError(null);
            const apiKey = 'YX4WSDKJ8LQ9QF3P9K3MYBDHV';
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`,
            );
            setWeatherData(response.data);
            dispatch(saveWeatherSearched(response.data));
        } catch (err) {
            setError('Unable to fetch weather data. Please try again.');
            console.error(err);
        }
    };

    console.log('new weatherData: ', weatherData);

    // handle subscribing email
    const handleSubscribe = async () => {
        try {
            setError('');
            setMessage('');
            const response = await weatherServices.sendEmailSubscriber(email);
            setShowConfirmation(true);
            setMessage(response.message);
            console.log('chạy vô đây!!');
        } catch (err) {
            setError('Failed to subscribe. Please try again.');
            console.log('Subcribe email: ', err);
        }
        console.log('email is sent: ', email);
    };

    // handle confirming the subscription
    const handleConfirmSubscription = async () => {
        try {
            setError(null);
            setMessage('');
            const response = await weatherServices.sendCodeConfirm(email, confirmationCode);
            setIsSubscribed(true);
            setMessage(response.message);
            console.log('chạy vô đây222!!');
        } catch (err) {
            setError('Failed to confirm subscription. Please check your code and try again.');
            console.error(err);
        }
    };

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
                        value={email}
                        // get the current input in textfiled
                        onChange={(e) => setEmail(e.target.value)}
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
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </Button>
                </Box>
                {showConfirmation && (
                    <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', mb: 1 }}>
                            Enter Confirmation Code
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Confirmation code"
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
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
                                onClick={handleConfirmSubscription}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                )}
                {message && (
                    <Typography color="success" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
            <UnsubscribeMail />
        </Box>
    );
}

export default SearchLocation;
