import React from 'react';
import { Layout, Button, Tooltip } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { viewResult, clearResult } from '../../redux/actions/map.acton';
import { Link } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { clearUserData } from '../../redux/actions/user.action';
import { auth } from '../../firebase/firebase.util';
const { Header } = Layout;

const MapStateToProps = (state: any) => ({});

const MapDispatchToProp = (dispatch: Function) => ({
    viewResult: () => dispatch(viewResult()),
    clearResult: () => dispatch(clearResult()),
    LogOut: () => dispatch(clearUserData()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Navbar = (props: Props) => {
    const signOut = () => {
        props.LogOut();
        auth.signOut();
    };
    return (
        <Header>
            <Link to="/">
                <div
                    style={{ cursor: 'pointer' }}
                    className="logo"
                    onClick={() => props.clearResult()}
                >
                    <Button
                        onClick={() => props.viewResult()}
                        style={{
                            background: 'transparent',
                            color: 'white',
                            fontWeight: 'bolder',
                            fontSize: '19px',
                        }}
                        type="dashed"
                    >
                        Locator
                    </Button>
                </div>
            </Link>

            <div className="result">
                <Link to="/results">
                    <Button
                        onClick={() => props.viewResult()}
                        style={{ background: 'transparent', color: 'white' }}
                        type="dashed"
                    >
                        Results
                    </Button>
                </Link>
            </div>
            <div className="logout-section">
                <Link to="/login">
                    <Tooltip title="Logout">
                        <Button
                            onClick={() => signOut()}
                            style={{
                                background: 'transparent',
                                color: 'white',
                            }}
                            type="dashed"
                        >
                            <LoginOutlined />
                        </Button>
                    </Tooltip>
                </Link>
            </div>
        </Header>
    );
};

export default connector(Navbar);
