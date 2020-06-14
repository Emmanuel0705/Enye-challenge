import React, { FC, ReactComponentElement, Fragment } from 'react';
import Navbar from '../Components/Navbar';
import { ConnectedProps, connect } from 'react-redux';
import { StateInter } from '../interfaces/Global';
import SelectKm from './ui/selectKM';
import SelectCategory from './ui/selectCat';

const MapStateToProps = (state: StateInter) => ({
    mapData: state.map.mapData,
    radius: state.map.radius,
    userCoords: state.map.userCoords,
    message: state.map.message,
    category: state.map.category,
    loading: state.map.loading,
    viewResult: state.map.viewResult,
    user: state.user.userData,
});

const MapDispatchToProp = (dispatch: Function) => ({});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Components {
    Main: any;
    Alert: any;
    Loader: any;
}
type Props = PropsFromRedux & Components;

interface ComponentProps {
    Component: any;
    showSelect?: Boolean;
}

export const Layout: FC<ComponentProps> = ({ Component, showSelect }) => {
    return (
        <Fragment>
            <Navbar />
            <Component />;
            {showSelect && (
                <Fragment>
                    <SelectKm />
                    <SelectCategory />
                </Fragment>
            )}
        </Fragment>
    );
};

const WithLayout: FC<Props> = (props: Props) => {
    const {
        Main,

        Alert,
        Loader,
        loading,
        viewResult,
        mapData,
        message,
        user,
    } = props;
    if (loading) return <Loader />;
    if (mapData.length > 0) return <Layout showSelect Component={Main} />;
    if (message) return <Layout showSelect Component={Alert} />;

    return <Loader />;
};

export default connector(WithLayout);
