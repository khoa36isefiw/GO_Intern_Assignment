import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch } from 'react-redux';
import { saveWeatherSearched } from '../../redux/weatherData/weatherDataAction';
import UnsubscribeMail from '../UnsubscribeMail/UnsubscribeMail';
import weatherServices from '../../services/WeatherServices';
import ConfirmCode from '../ConfirmCode/ConfirmCode';
import SubscribeMail from '../SubscribeMail/SubscribeMail';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { mobileScreen } from '../Theme/Theme';
import { CustomButton } from '../CustomButton/CustomButton';
import ToastMessage from '../ToastMessage/ToastMessage';
import { blue } from '@mui/material/colors';

function SearchLocation() {
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState(''); // show confirmation code input textfiled
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [messageShow, setMessageShow] = useState('');
    const [type, setType] = useState('');

    // load weather history from local storage on component mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
        setWeatherHistory(savedHistory);
    }, []);

    // save weather history to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
    }, [weatherHistory]);

    // check if the city already exists in the weather history
    const isCityInHistory = (city) => {
        return weatherHistory.find((item) =>
            item.resolvedAddress.toLowerCase().includes(city.toLowerCase()),
        );
    };

    const handleSearch = async () => {
        try {
            setError(null);
            // check if the city is already in the weather history
            const cityExists = isCityInHistory(cityName);
            console.log('City exists in history:', cityExists);

            if (cityExists) {
                // if city already exists in history, use the existing data
                setWeatherData(cityExists);
                dispatch(saveWeatherSearched(cityExists));
            } else {
                // if city does not exist, fetch new data and update history
                const response = await weatherServices.getCurrentWeather(cityName);
                console.log('response: ', response);
                setWeatherData(response);
                dispatch(saveWeatherSearched(response));

                // update weather history
                const newHistory = [
                    ...weatherHistory,
                    { ...response, timestamp: new Date().toISOString() },
                ];
                setWeatherHistory(newHistory);
            }
        } catch (err) {
            setError('An error occurred during the search. Please try again.');
            console.error('Search error:', err);
        } finally {
            setCityName('');
        }
    };

    const handleKeyPressEnter = (e) => {
        if (e.key === 'Enter' && cityName !== '') {
            handleSearch();
        }
    };

    // Handle history item click
    const handleHistoryClick = (historyItem) => {
        setSelectedHistory(historyItem);
        setWeatherData(historyItem);
        dispatch(saveWeatherSearched(historyItem));
    };

    // Handle email subscription
    const handleSubscribe = async () => {
        try {
            setError('');
            setMessage('');
            const response = await weatherServices.sendEmailSubscriber(email);
            if (response.error) {
                setShowConfirmation(false);
                setType('error');
                setMessage(response.message);
            } else {
                setShowConfirmation(true);
                setMessage(response.message);
                setType('success');
            }

            console.log('response: ', response.error);

            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 3000);
            setMessageShow(response.message);
            setType(
                response.message.includes('error') || response.message.includes('already')
                    ? 'error'
                    : 'success',
            );
        } catch (err) {
            setError('Failed to subscribe. Please try again.');
            console.error('Error subscribing email:', err);
            setOpen(true);
            setMessageShow('Failed to subscribe. Please try again.');
            setType('error');
        }
    };

    // Handle subscription confirmation
    const handleConfirmSubscription = async () => {
        try {
            setError(null);
            setMessage('');
            const response = await weatherServices.sendCodeConfirm(email, confirmationCode);
            if (response) {
                setIsSubscribed(true);
                setMessage(response.message);
            }
            setShowConfirmation(false);
        } catch (err) {
            setError('Failed to confirm subscription. Please check your code and try again.');
            console.error('Error confirming subscription:', err);
        }
    };

    const handleClose = (event, reason) => {
        // Prevent closing when clicking outside (for example, with the "clickaway" reason)
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const tempFilter = new Set();
    // Lọc các item với địa chỉ duy nhất
    const uniqueWeatherHistory = weatherHistory.filter((item) => {
        if (!tempFilter.has(item.resolvedAddress)) {
            tempFilter.add(item.resolvedAddress);
            return true; // Giữ lại item này trong danh sách
        }
        return false; // Loại bỏ item này khỏi danh sách
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Enter a City Name</Typography>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <TextFieldCustomize
                        inputValue={cityName}
                        onChangeValue={(e) => setCityName(e.target.value)}
                        placeholder={'Example: New York, Tokyo, Seoul'}
                        onHandleKeyDown={handleKeyPressEnter}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CustomButton
                        empty={cityName !== '' ? false : true}
                        textAction={'Search'}
                        onHandleClick={handleSearch}
                    />
                </Grid>
            </Grid>

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Weather History */}
            <Box
                sx={{
                    mt: 4,
                    maxHeight: '400px',
                    overflow: 'scroll',
                    bgcolor: '#5472f0',
                    borderRadius: '8px',
                    p: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        mb: 1,
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    Weather History
                </Typography>
                <Box>
                    {uniqueWeatherHistory.length > 0 ? (
                        uniqueWeatherHistory.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    // mb: 2,
                                    cursor: 'pointer',

                                    // bgcolor: '#f0f0f0',
                                    p: 1,
                                    borderRadius: 1,
                                }}
                                onClick={() => handleHistoryClick(item)}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            color: 'black',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {index + 1}. {item.resolvedAddress}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
                            No weather history available.
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Subscribe to weather updates */}
            <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
                    Sign up for daily weather forecast news
                </Typography>
                {/* subscribe mail to get daily weather news */}
                <SubscribeMail
                    email={email}
                    setEmail={setEmail}
                    onHandleClickAction={handleSubscribe}
                />

                {/* confirm confirm */}
                {showConfirmation && (
                    <ConfirmCode
                        email={confirmationCode}
                        setEmail={setConfirmationCode}
                        onHandleClickAction={handleConfirmSubscription}
                    />
                )}
                {message && (
                    <Typography color="success" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>

            <UnsubscribeMail />
            {open && (
                <ToastMessage
                    open={open}
                    type={type}
                    message={messageShow}
                    onHandleClose={handleClose}
                />
            )}
        </Box>
    );
}

export default SearchLocation;
