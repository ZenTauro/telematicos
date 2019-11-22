export enum ActionTypes {
    UPDATE_USER = 'UPDATE_USER',
}

export interface IUser {
    username: string,
}

export interface IState {
    current_user: IUser,
}

interface IUpdateUserAction {
    type: ActionTypes.UPDATE_USER,
    payload: string,
}

export function updateUser(username: string): IUpdateUserAction {
    return {
        type: ActionTypes.UPDATE_USER,
        payload: username,
    }
};

export type Action = IUpdateUserAction;