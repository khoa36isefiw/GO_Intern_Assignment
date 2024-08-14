import { Button } from '@mui/material';
import React from 'react';

export const CustomButton = ({ textAction, onHandleClick }) => {
    return (
        <Button
            variant="contained"
            sx={{
                fontWeight: 'bold',
                bgcolor: '#5472f0',
                textTransform: 'initial',
                ml: 1,
                py: 1,
            }}
            onClick={onHandleClick}
        >
            {/* Subscribe */}
            {textAction}
        </Button>
    );
};
