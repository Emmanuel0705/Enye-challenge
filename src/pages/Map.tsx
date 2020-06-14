import React, { Fragment, useEffect } from 'react';
import Map from '../Components/Map';
import Cards from '../Components/HosptCards';
import '../App.css';

import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from '../interfaces/Global';
import SelectCategory from '../Components/ui/selectCat';

import {
    fetchMapData,
    setMessage,
    clearMessage,
    setLoader,
} from '../redux/actions/map.acton';
import SelectKm from '../Components/ui/selectKM';

interface StateInterface {
    loggedIn: boolean;
    hasCheckAuth: string;
    userData: { id: string; email: string };
}
const MapStateToProps = (state: StateInter) => ({
    mapData: state.map.mapData,
    radius: state.map.radius,
    userCoords: state.map.userCoords,
    message: state.map.message,
    category: state.map.category,
    loading: state.map.loading,
    viewResult: state.map.viewResult,
});

const MapDispatchToProp = (dispatch: Function) => ({
    // fetchMapData: (radius: number, category: string) =>
    //     dispatch(fetchMapData(radius, category)),
    // setMessage: (data: string) => dispatch(setMessage(data)),
    // clearMessage: () => dispatch(clearMessage()),
    // setLoader: () => dispatch(setLoader()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Main = (props: Props) => {
    const {
        mapData,

        radius,
        message,

        category,
        loading,

        viewResult,
    } = props;

    useEffect(() => {
        // clearMessage();
        // setLoader();
        // fetchMapData(radius, category);
    }, []);
    return (
        <Fragment>
            <Map hospitalData={mapData} />
            <Cards hospitalData={mapData} />
        </Fragment>
    );
};

export default connector(Main);
