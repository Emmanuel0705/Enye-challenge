import React, { useEffect } from 'react';

import './App.css';
import { Layout } from 'antd';

import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from './interfaces/Global';
import WithLayout from './Components/Layout';
import Main from './pages/Main/index';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';

import {
    fetchMapData,
    setMessage,
    clearMessage,
    setLoader,
    clearLoader,
    setUserCoords,
} from './redux/actions/map.acton';

const MapStateToProps = (state: StateInter) => ({
    msg: state.map.message,
    loading: state.map.loading,
});

const MapDispatchToProp = (dispatch: Function) => ({
    storeUserCoord: () => dispatch(setUserCoords()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props) => {
    const { storeUserCoord, msg, loading } = props;

    useEffect(() => {
        storeUserCoord();
    }, [msg, loading]);
    return (
        <div className="App">
            <Layout>
                <WithLayout Main={Main} Loader={Spinner} Alert={Alert} />
            </Layout>
        </div>
    );
};

export default connector(App);
