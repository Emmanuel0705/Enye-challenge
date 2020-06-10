import React, { Fragment, useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Cards from './Components/HosptCards';
import './App.css';
import { Layout } from 'antd';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';
import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from './interfaces/Global';
import SelectCategory from './Components/ui/selectCat';

import {
    fetchMapData,
    setMessage,
    clearMessage,
    setLoader,
} from './redux/actions/map.acton';
import SelectKm from './Components/ui/selectKM';
import SignIn from './Components/auth';
import { signInWithGoogle, auth } from './firebase/firebase.util';

interface StateInterface {
    loggedIn: boolean;
    hasCheckAuth: string;
}
const MapStateToProps = (state: StateInter) => ({
    mapData: state.map.mapData,
    radius: state.map.radius,
    userCoords: state.map.userCoords,
    message: state.map.message,
    category: state.map.category,
    loading: state.map.loading,
});

const MapDispatchToProp = (dispatch: Function) => ({
    fetchMapData: (radius: number, category: string) =>
        dispatch(fetchMapData(radius, category)),
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
    } = props;

    const [state, setState] = useState<StateInterface>({
        loggedIn: false,
        hasCheckAuth: 'default',
    });
    const checkAuth = (): any => {
        setState({ ...state, hasCheckAuth: 'checking' });
        auth.onAuthStateChanged((user) => {
            if (user) {
                setState({ ...state, loggedIn: true });
                return true;
            }

            setState({ ...state, hasCheckAuth: 'fail' });
            return false;
        });
    };

    useEffect(() => {
        clearMessage();
        setLoader();
        // auth.signOut();
        checkAuth();

        if (state.loggedIn) {
            fetchMapData(radius, category);
        }
    }, [fetchMapData, radius, clearMessage, state.loggedIn, category]);
    return (
        <div className="App">
            {state.loggedIn ? (
                <Layout>
                    <Navbar />
                    {loading ? (
                        <Spinner />
                    ) : props.mapData.length > 0 ? (
                        <Fragment>
                            <Map hospitalData={mapData} />
                            <Cards hospitalData={mapData} />
                        </Fragment>
                    ) : (
                        <Alert message="Error Message" description={message} />
                    )}
                    <Fragment>
                        <SelectKm />
                        <SelectCategory />
                    </Fragment>
                </Layout>
            ) : state.hasCheckAuth === 'fail' ? (
                <SignIn onClick={signInWithGoogle} />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default connector(App);
