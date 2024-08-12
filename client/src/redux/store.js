// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { weatherDataReducer } from './weatherData/weatherDataReducer';

const rootReducer = combineReducers({
    manageWeatherData: weatherDataReducer,
});

const store = createStore(rootReducer);

export default store;
