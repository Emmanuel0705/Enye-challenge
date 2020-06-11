import React from 'react';
import { Layout, Button } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { viewResult, clearResult } from '../../redux/actions/map.acton';

const { Header } = Layout;

const MapStateToProps = (state: any) => ({});

const MapDispatchToProp = (dispatch: Function) => ({
    viewResult: () => dispatch(viewResult()),
    clearResult: () => dispatch(clearResult()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Navbar = (props: Props) => {
    return (
        <Header>
            <div
                style={{ cursor: 'pointer' }}
                className="logo"
                onClick={() => props.clearResult()}
            >
                Locator
            </div>
            <div className="result">
                <Button
                    onClick={() => props.viewResult()}
                    style={{ background: 'transparent', color: 'white' }}
                    type="dashed"
                >
                    Results
                </Button>
            </div>
        </Header>
    );
};

export default connector(Navbar);
