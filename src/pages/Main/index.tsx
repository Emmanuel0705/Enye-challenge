import React, { Fragment, useEffect } from 'react';
import Map from './Map';
import Cards from './Cards';
import '../../App.css';

import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from '../../interfaces/Global';
import { setUserCoords } from '../../redux/actions/map.acton';

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
    setCoords: () => dispatch(setUserCoords()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Main = (props: Props) => {
    const { radius, category, userCoords, setCoords } = props;
    useEffect(() => {
        if (userCoords.lat === 0 && userCoords.lng === 0) {
            setCoords();
        }
    }, [radius, category, userCoords]);
    return (
        <Fragment>
            <Map />
            <Cards />
        </Fragment>
    );
};

export default connector(Main);
