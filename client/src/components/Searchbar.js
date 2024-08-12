import { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import {
    TextField,
    Button,
    Box,
    CircularProgress,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

function Searchbar({ setCityName }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        setCityName(searchInput);
    };

    const handleSelect = async (address) => {
        setSearchInput(address);
        try {
            const results = await geocodeByAddress(address);
            setCityName(results[0].formatted_address);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <Box display="flex" p={2} bgcolor="background.paper" borderRadius={2} position="relative">
            <PlacesAutocomplete
                value={searchInput}
                onChange={setSearchInput}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <Box flex={1} mr={2} position="relative">
                        <TextField
                            {...getInputProps({
                                placeholder: 'Enter the city name or country',
                            })}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        {loading && (
                            <Box display="flex" justifyContent="center" mt={1}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        <Paper
                            elevation={3}
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%',
                                zIndex: 1,
                            }}
                        >
                            <List>
                                {suggestions.map((suggestion, index) => (
                                    <ListItem
                                        key={index}
                                        {...getSuggestionItemProps(suggestion)}
                                        button
                                    >
                                        <ListItemText primary={suggestion.description} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                )}
            </PlacesAutocomplete>
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
}

export default Searchbar;
