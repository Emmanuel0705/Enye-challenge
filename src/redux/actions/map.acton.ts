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
} from '../types/map.type';

export const storeMapData = (mapdata: any[]): Object => async (
    dispatch: Function
) => {
    dispatch({
        type: STORE_MAP_DATA,
        payload: mapdata,
    });
};

export const changeRadius = (data: number): Object => async (
    dispatch: Function
) => {
    dispatch(clearMessage());
    dispatch({
        type: CHANGE_RADIUS,
        payload: data,
    });
};
export const changeCategory = (data: string): Object => async (
    dispatch: Function
) => {
    dispatch(clearMessage());
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

export const clearResult = () => ({
    type: CLEAR_RESULT,
});
