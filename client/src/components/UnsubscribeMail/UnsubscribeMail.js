import React, { useState } from 'react';
import axios from 'axios';
import weatherServices from '../../services/WeatherServices';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { CustomButton } from '../CustomButton/CustomButton';
import { Box } from '@mui/material';

function UnsubscribeMail() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUnsubscribe = async () => {
        try {
            // const response = await axios.post('http://localhost:3001/api/v1/weathers/unsubscribe', {
            //     email,
            // });

            setMessage('');
            const response = await weatherServices.unsubscribeMail(email);
            setMessage(response.message);
        } catch (error) {
            setMessage('An error occurred while trying to unsubscribe.');
        }
    };

    return (
        <div>
            <h3>Unsubscribe from Weather News</h3>
            {/* initial */}
            {/* <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleUnsubscribe}>Unsubscribe</button> */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextFieldCustomize
                    inputValue={email}
                    onChangeValue={(e) => setEmail(e.target.value)}
                />
                <CustomButton textAction={'Unsub'} onHandleClick={handleUnsubscribe} />
            </Box>

            <p>{message}</p>
        </div>
    );
}

export default UnsubscribeMail;
