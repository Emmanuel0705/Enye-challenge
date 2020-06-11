import {
    STORE_MAP_DATA,
    CHANGE_RADIUS,
    SET_USER_COORDS,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    CHANGE_CATEGORY,
    SET_LOADER,
    CLEAR_LOADER,
    CLEAR_MAP_DATA,
    VIEW_RESULTS,
    CLEAR_RESULT,
    STORE_HOSPITALS,
    STORE_CLINICS,
    STORE_MEDICALS,
    STORE_PHARMACIES,
} from '../types/map.type';

interface INIT_STATE {
    mapData: [];
    userCoords: { lng: number; lat: number };
    radius: number;
    message: string;
    category: string;
    loading: boolean;
    viewResult: boolean;
    hospitals: any[];
    clinics: any[];
    pharmacies: any[];
    medicals: any[];
}
const INITIAL_STATE: INIT_STATE = {
    mapData: [],
    userCoords: { lng: 0, lat: 0 },
    radius: 3000,
    message: '',
    category: 'hospital',
    loading: false,
    viewResult: false,
    hospitals: [],
    clinics: [],
    pharmacies: [],
    medicals: [],
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
        case CHANGE_CATEGORY:
            return { ...state, category: action.payload };
        case SET_LOADER:
            return { ...state, loading: true };
        case CLEAR_LOADER:
            return { ...state, loading: false };
        case CLEAR_MAP_DATA:
            return { ...state, mapData: [] };
        case VIEW_RESULTS:
            return { ...state, viewResult: true };
        case CLEAR_RESULT:
            return { ...state, viewResult: false };
        case STORE_HOSPITALS:
            return { ...state, hospitals: action.payload };
        case STORE_CLINICS:
            return { ...state, clinics: action.payload };
        case STORE_MEDICALS:
            return { ...state, medicals: action.payload };
        case STORE_PHARMACIES:
            return { ...state, pharmacies: action.payload };
        default:
            return state;
    }
};

export default mapReducer;
