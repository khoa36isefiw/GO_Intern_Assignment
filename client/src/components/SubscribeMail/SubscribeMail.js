import { Box, Grid } from '@mui/material';
import React from 'react';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { CustomButton } from '../CustomButton/CustomButton';

function SubscribeMail({ email, setEmail, onHandleClickAction }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <TextFieldCustomize
                        inputValue={email}
                        onChangeValue={(e) => setEmail(e.target.value)}
                        placeholder={'Enter your mail address...'}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CustomButton
                        empty={email !== '' ? false : true}
                        textAction={'Subscribe'}
                        onHandleClick={onHandleClickAction}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SubscribeMail;
