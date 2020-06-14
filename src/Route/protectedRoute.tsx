import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StateInter } from '../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
interface componentType {
    Component: any;
    exact: boolean;
    path: string;
}
const MapStateToProps = (state: StateInter) => ({
    user: state.user.userData,
});

const MapDispatchToProp = (dispatch: Function) => ({});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & componentType;
const PrivateRoute = (props: Props) => {
    const { user, Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) =>
                user.id && user.email ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default connector(PrivateRoute);
