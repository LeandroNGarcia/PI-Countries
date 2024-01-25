import { combineReducers } from 'redux';
import { valuesReducer } from './valuesReducer';
import { countriesReducer } from './countriesReducer';

const rootReducer = combineReducers({
    values: valuesReducer,
    countries: countriesReducer
});

export default rootReducer;