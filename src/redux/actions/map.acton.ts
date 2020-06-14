import {
    STORE_MAP_DATA,
    CHANGE_RADIUS,
    SET_USER_COORDS,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    CHANGE_CATEGORY,
    CLEAR_LOADER,
    SET_LOADER,
    CLEAR_MAP_DATA,
    CLEAR_RESULT,
    VIEW_RESULTS,
    STORE_HOSPITALS,
    STORE_CLINICS,
    STORE_PHARMACIES,
    STORE_MEDICALS,
} from '../types/map.type';
import fetchHospital from '../../util/fetchHospitals';
import { addLocation, fetchData } from '../../firebase/firebase.util';

interface dbObj {
    formattedAddress: any;
    distance: any;
    name: any;
}

export const storeMapData = (mapdata: any[]): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: STORE_MAP_DATA,
        payload: mapdata,
    });
};

export const fetchMapData = (
    radius: number,
    cat: string,
    userId: string
) => async (dispatch: Function) => {
    dispatch(clearMapData());
    if (!navigator.onLine) {
        dispatch(clearLoader());
        return dispatch(
            setMessage(
                'No Internet connection, pls check your connect and try again and try again'
            )
        );
    }

    if (!navigator.geolocation) {
        dispatch(clearLoader());
        return dispatch(setMessage('Geolocation is not supported'));
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            const res = await fetchHospital(lng, lat, radius, cat);
            if (res.length > 0 && res[0] !== 'error') {
                addLocation(
                    `${cat}s`,
                    userId,
                    res.map((data: dbObj) => {
                        return {
                            userId,
                            formattedAddress: data.formattedAddress,
                            distance: data.distance,
                            name: data.name,
                        };
                    })
                );
                dispatch(clearLoader());

                return dispatch(storeMapData(res));
            }
            if (res.length === 0) {
                dispatch(setMessage(`No ${cat}  found within this range`));
                return dispatch(clearLoader());
            }
            if (res[0] === 'error') {
                dispatch(clearLoader());
                return dispatch(setMessage(res[1]));
            }
            dispatch(clearLoader());
        },
        (error) => {
            dispatch(
                setMessage(
                    'Unable to get your current location please, refresh this page or user another browser'
                )
            );
        }
    );
};

export const changeRadius = (data: number): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: CHANGE_RADIUS,
        payload: data,
    });
};
export const changeCategory = (data: string): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: CHANGE_CATEGORY,
        payload: data,
    });
};

export const setUserCoords = (): Object => async (dispatch: Function) => {
    if (!navigator.onLine) {
        dispatch(clearLoader());
        return dispatch(
            setMessage(
                'No Internet connection, pls check your connect and try again and try again'
            )
        );
    }

    if (!navigator.geolocation) {
        dispatch(clearLoader());
        return dispatch(setMessage('Geolocation is not supported'));
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            dispatch({
                type: SET_USER_COORDS,
                payload: { lat, lng },
            });
        },
        (error) => {
            dispatch(
                setMessage(
                    'Unable to get your current location please, refresh this page or user another browser'
                )
            );
        }
    );
};
export const setMessage = (data: string): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: SET_MESSAGE,
        payload: data,
    });
};
export const clearMessage = (): Object => async (dispatch: Function) => {
    dispatch({
        type: CLEAR_MESSAGE,
    });
};
export const clearLoader = () => ({
    type: CLEAR_LOADER,
});
export const setLoader = () => ({
    type: SET_LOADER,
});
export const clearMapData = () => ({
    type: CLEAR_MAP_DATA,
});
const getCat = (type: string) => {
    switch (type) {
        case 'hospitals':
            return STORE_HOSPITALS;
        case 'clinics':
            return STORE_CLINICS;
        case 'pharmacies':
            return STORE_PHARMACIES;
        case 'medicals':
            return STORE_MEDICALS;
        default:
            return '';
    }
};
export const viewResult = () => async (dispatch: Function) => {
    // dispatch(setLoader());
    dispatch({
        type: VIEW_RESULTS,
    });
    const category = ['hospitals', 'clinics', 'pharmacies', 'medicals'];
    category.map(async (cat) => {
        const res = await fetchData(cat);

        dispatch({
            type: getCat(cat),
            payload: res,
        });
    });
};
export const clearResult = () => ({
    type: CLEAR_RESULT,
});
