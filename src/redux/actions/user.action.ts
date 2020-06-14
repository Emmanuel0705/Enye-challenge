import { STORE_USER_DATA, CLEAR_USER_DATA } from '../types/user.type';

export const storeUser = (user: any) => async (dispatch: Function) => {
    dispatch({
        type: STORE_USER_DATA,
        payload: user,
    });
};
export const clearUserData = () => async (dispatch: Function) => {
    dispatch({
        type: CLEAR_USER_DATA,
    });
};
