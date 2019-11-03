import { UPDATE_USER, Action } from '../Actions';
import { IStoreState } from '../Store';

export
function username(state: IStoreState = { username: 'anon' }, action: Action): IStoreState {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, username: action.payload };
        default:
            return state;
    }
}