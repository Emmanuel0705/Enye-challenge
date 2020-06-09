import {
    STORE_MAP_DATA,
    CHANGE_RADIUS,
    SET_USER_COORDS,
    SET_MESSAGE,
    CLEAR_MESSAGE,
} from '../types/map.type';

interface INIT_STATE {
    mapData: [];
    userCoords: { lng: number; lat: number };
    radius: number;
    message: string;
}
const INITIAL_STATE: INIT_STATE = {
    mapData: [],
    userCoords: { lng: 0, lat: 0 },
    radius: 3000,
    message: '',
};

const mapReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case STORE_MAP_DATA:
            return { ...state, mapData: action.payload };
        case CHANGE_RADIUS:
            return { ...state, radius: action.payload };
        case SET_USER_COORDS:
            return {
                ...state,
                userCoords: {
                    lng: action.payload.lng,
                    lat: action.payload.lat,
                },
            };
        case SET_MESSAGE:
            return { ...state, message: action.payload };
        case CLEAR_MESSAGE:
            return { ...state, message: '' };
        default:
            return state;
    }
};

export default mapReducer;