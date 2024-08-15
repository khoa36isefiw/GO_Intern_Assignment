import React, { useState } from 'react';
import axios from 'axios';
import weatherServices from '../../services/WeatherServices';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { CustomButton } from '../CustomButton/CustomButton';
import { Box, Grid } from '@mui/material';

function UnsubscribeMail() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUnsubscribe = async () => {
        try {
            setMessage('');
            const response = await weatherServices.unsubscribeMail(email);
            setMessage(response.message);
        } catch (error) {
            setMessage('An error occurred while trying to unsubscribe.');
        }
    };

    return (
        <Box>
            <h3>Unsubscribe from Weather News</h3>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <TextFieldCustomize
                        inputValue={email}
                        onChangeValue={(e) => setEmail(e.target.value)}
                        placeholder={'Enter your email address...'}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CustomButton
                        empty={email !== '' ? false : true}
                        textAction={'Unsub'}
                        onHandleClick={handleUnsubscribe}
                    />
                </Grid>
            </Grid>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextFieldCustomize
                    inputValue={email}
                    onChangeValue={(e) => setEmail(e.target.value)}
                />
                <CustomButton textAction={'Unsub'} onHandleClick={handleUnsubscribe} />
            </Box> */}

            <p>{message}</p>
        </Box>
    );
}

export default UnsubscribeMail;
