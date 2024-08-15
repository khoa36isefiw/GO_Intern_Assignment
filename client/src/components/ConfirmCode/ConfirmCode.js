import { Box, Grid } from '@mui/material';
import React from 'react';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { CustomButton } from '../CustomButton/CustomButton';

function ConfirmCode({ email, setEmail, onHandleClickAction }) {
    return (
        <Box>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <TextFieldCustomize
                        inputValue={email}
                        onChangeValue={(e) => setEmail(e.target.value)}
                        placeholder={'Enter code from mail...'}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CustomButton
                        empty={email !== '' ? false : true}
                        textAction={'Confirm'}
                        onHandleClick={onHandleClickAction}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ConfirmCode;
