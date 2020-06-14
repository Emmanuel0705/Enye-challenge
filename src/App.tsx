import React, { useEffect } from 'react';

import './App.css';
import { Layout } from 'antd';

import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from './interfaces/Global';
import WithLayout from './Components/Layout';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';
import Result from './pages/Results';

import {
    fetchMapData,
    setMessage,
    clearMessage,
    setLoader,
} from './redux/actions/map.acton';

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
    userData: state.user.userData,
});

const MapDispatchToProp = (dispatch: Function) => ({
    fetchMapData: (radius: number, category: string, userId: string) =>
        dispatch(fetchMapData(radius, category, userId)),
    setMessage: (data: string) => dispatch(setMessage(data)),
    clearMessage: () => dispatch(clearMessage()),
    setLoader: () => dispatch(setLoader()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props) => {
    const {
        mapData,
        fetchMapData,
        radius,
        message,
        clearMessage,
        category,
        loading,
        setLoader,
        viewResult,
        userData,
    } = props;

    useEffect(() => {
        console.log('userId', userData.id);
        clearMessage();
        setLoader();
        if (userData.id) {
            fetchMapData(radius, category, userData.id);
        }
    }, [fetchMapData, radius, clearMessage, category, userData]);
    return (
        <div className="App">
            <Layout>
                <WithLayout Main={Main} Loader={Spinner} Alert={Alert} />
            </Layout>
        </div>
    );
};

export default connector(App);
