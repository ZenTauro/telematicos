import { ActionTypes, Action } from '../Actions';

function initstate(): string {
    let ret = '';
    if (localStorage.getItem('name')) {
        ret = localStorage.name;
    } else {
        ret = 'anon';
    }

    return ret;
}

const init_name: string = initstate();

export default
function username(state: string = init_name, action: Action): string {
    switch (action.type) {
        case ActionTypes.UPDATE_USER:
            console.log(`Dispatching action UPDATE_USER ${state} => ${action.payload}`);
            return action.payload;
        default:
            return state;
    }
}
