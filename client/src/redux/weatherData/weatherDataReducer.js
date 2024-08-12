import { WEATHER_DATA_SEARCHED } from '../actionConstant';

const initialState = {
    searchData: '',
};

export const weatherDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEATHER_DATA_SEARCHED:
            const { data } = action.payload;
            return {
                ...state,
                searchData: data,
            };
        default:
            return state;
    }
};
