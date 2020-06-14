import React, { Fragment, useEffect } from 'react';
import Map from './Map';
import Cards from './Cards';
import '../../App.css';

import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from '../../interfaces/Global';

import {
    fetchMapData,
    setMessage,
    clearMessage,
    setLoader,
} from '../../redux/actions/map.acton';
import SelectKm from '../../Components/ui/selectKM';

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
        userCoords,
    } = props;

    useEffect(() => {
        console.log(category, radius, message, userCoords);
    }, [radius, category, userCoords]);
    return (
        <Fragment>
            <Map />
            <Cards />
        </Fragment>
    );
};

export default connector(Main);
