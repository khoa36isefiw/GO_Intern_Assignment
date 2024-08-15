import { Button } from '@mui/material';
import React from 'react';
import { ipadProScreen, mobileScreen, tabletScreen } from '../Theme/Theme';

export const CustomButton = ({ textAction, onHandleClick, empty }) => {
    return (
        <Button
            variant="contained"
            fullWidth
            disabled={empty}
            sx={{
                fontWeight: 'bold',
                bgcolor: '#5472f0',
                textTransform: 'initial',
                ml: 1,
                py: 1,
                [ipadProScreen]: {
                    fontSize: '13.5px',
                },
                [mobileScreen]: {
                    mt: 1,
                    ml: 0,
                },
                [tabletScreen]: {
                    mt: 1,
                    ml: 0,
                },
            }}
            onClick={onHandleClick}
        >
            {/* Subscribe */}
            {textAction}
        </Button>
    );
};
