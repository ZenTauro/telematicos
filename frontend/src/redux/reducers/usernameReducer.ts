import { ActionTypes, Action } from '../Actions';

const init_name: string = localStorage.name;

export default
function username(state: string = init_name, action: Action): string {
    switch (action.type) {
        case ActionTypes.UPDATE_USER:
            console.log(`Dispatching action UPDATE_USER ${username} => ${action.payload}`);
            return action.payload;
        default:
            return state;
    }
}
