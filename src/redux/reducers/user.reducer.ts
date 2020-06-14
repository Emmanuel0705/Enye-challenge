import { STORE_USER_DATA, CLEAR_USER_DATA } from '../types/user.type';

export interface INIT_STATE {
    userData: { id: string; email: string };
}
const INITIAL_STATE: INIT_STATE = {
    userData: { id: '', email: '' },
};

const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case STORE_USER_DATA:
            return { ...state, userData: action.payload };
        case CLEAR_USER_DATA:
        case STORE_USER_DATA:
            return { ...state, userData: {} };
        default:
            return state;
    }
};

export default userReducer;
