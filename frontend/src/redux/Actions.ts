export interface IUser {
    username: string,
}

export interface IState {
    current_user: IUser,
}

export const UPDATE_USER = 'UPDATE_USER';

interface IUpdateUserAction {
    type: typeof UPDATE_USER,
    payload: string,
}

export function updateUser(username: string): IUpdateUserAction {
    return {
        type: UPDATE_USER,
        payload: username,
    }
};

export type Action = IUpdateUserAction;