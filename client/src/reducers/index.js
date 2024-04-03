import { combineReducers } from 'redux';
import itemReducer from './itemReducer'; // Correct the import path

export default combineReducers({
    item: itemReducer
});