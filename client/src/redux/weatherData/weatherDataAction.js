import { WEATHER_DATA_SEARCHED } from '../actionConstant';

export const saveWeatherSearched = (data) => ({
    type: WEATHER_DATA_SEARCHED,
    payload: { data },
});
