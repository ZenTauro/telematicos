import { combineReducers } from 'redux';

import username from './usernameReducer';

const rootReducer = combineReducers({
    username: username
});

export default rootReducer;