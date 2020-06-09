import {
    STORE_MAP_DATA,
    CHANGE_RADIUS,
    SET_USER_COORDS,
    SET_MESSAGE,
} from '../types/map.type';
import fetchHospital from '../../util/fetchHospitals';

export const storeMapData = (mapdata: any[]): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: STORE_MAP_DATA,
        payload: mapdata,
    });
};

export const fetchMapData = (radius: number) => async (dispatch: Function) => {
    if (!navigator.geolocation) {
        return dispatch(setMessage("'Geolocation is not supported'"));
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            console.log(123);
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            const res = await fetchHospital(lng, lat, radius);
            if (res.length > 0 && res[0] !== 'error') {
                console.log(res);
                dispatch(storeMapData(res));
            }
            if (res.length === 0)
                dispatch(setMessage('No Hospital found within this range'));
            if (res[0] === 'error') {
                dispatch(setMessage(res[1]));
            }

            // console.log(res);
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

export const setUserCoords = (data: any[]): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: SET_USER_COORDS,
        payload: data,
    });
};
export const setMessage = (data: string): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: SET_MESSAGE,
        payload: data,
    });
};
