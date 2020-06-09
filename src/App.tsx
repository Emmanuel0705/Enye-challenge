import React, { Fragment, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Cards from './Components/HosptCards';
import './App.css';
import { Layout } from 'antd';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';
import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from './interfaces/Global';
import { fetchMapData, setMessage } from './redux/actions/map.acton';
import SelectKm from './Components/ui/selectKM';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from './firebase/firebase.util';

interface StateInterface {
    message: string;
    radius: number;
    hospitalData: any[];
    geoError: boolean;
}
const MapStateToProps = (state: StateInter) => ({
    mapData: state.map.mapData,
    radius: state.map.radius,
    userCoords: state.map.userCoords,
    message: state.map.message,
});

const MapDispatchToProp = (dispatch: Function) => ({
    fetchMapData: (data: number) => dispatch(fetchMapData(data)),
    setMessage: (data: string) => dispatch(setMessage(data)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props) => {
    const { mapData, fetchMapData, radius, message } = props;

    useEffect(() => {
        console.log(radius);
        fetchMapData(radius);
    }, [fetchMapData, radius]);
    return (
        <div className="App">
            <Layout>
                <Navbar />
                {props.mapData.length > 0 ? (
                    <Fragment>
                        <Map hospitalData={mapData} />
                        <Cards hospitalData={mapData} />
                    </Fragment>
                ) : message ? (
                    <Alert message="Error Message" description={message} />
                ) : (
                    <Spinner />
                )}
                <SelectKm />
                <GoogleButton onClick={signInWithGoogle} />
            </Layout>
        </div>
    );
};

export default connector(App);
