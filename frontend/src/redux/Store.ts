import { createStore } from 'redux';
import { username } from './reducers'

export interface IStoreState {
    username: string
}

export const store = createStore(username, {
    username: 'anon'
});