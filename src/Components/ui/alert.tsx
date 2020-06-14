import React from 'react';
import { Alert } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { StateInter } from '../../interfaces/Global';

const MapStateToProps = (state: StateInter) => ({
    msg: state.map.message,
});

const MapDispatchToProp = (dispatch: Function) => ({});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const AlertComponent = (props: Props) => {
    return (
        <div className="large-container">
            <Alert
                message="Error Message"
                description={props.msg}
                type="error"
                showIcon
            />
        </div>
    );
};

export default connector(AlertComponent);
