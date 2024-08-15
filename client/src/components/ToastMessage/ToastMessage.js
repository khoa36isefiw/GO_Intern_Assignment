import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ToastMessage({ open, setOpen, message, type, onHandleClose }) {
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={onHandleClose}
            >
                <Alert
                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}
                    onClose={onHandleClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
