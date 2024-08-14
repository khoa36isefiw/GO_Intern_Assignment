import React, { useState } from 'react';

function UseErrorMessage() {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('error');

    const showError = (errMessage) => {
        setError(errMessage);
    };

    const showMessage = (successMessage) => {
        setError(successMessage);
    };

    const clearMessages = () => {
        setError(null);
        setMessage('');
    };

    return {
        error,
        message,
        showError,
        showMessage,
        clearMessages,
    };
}

export default UseErrorMessage;
