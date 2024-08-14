import { TextField } from '@mui/material';
import React from 'react';

export const TextFieldCustomize = ({ inputValue, onChangeValue }) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            placeholder="Example: New York, Tokyo, Soul"
            // value={cityName}
            value={inputValue}
            // value current value in text field
            // onChange={(e) => setCityName(e.target.value)}
            onChange={onChangeValue}
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
    );
};
