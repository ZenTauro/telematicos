import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

export
interface IStoreState {
    username: string
}

export
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);