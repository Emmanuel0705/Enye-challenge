import React, { useEffect, Fragment, useState } from 'react';
import GoogleButton from 'react-google-button';
import Spinner from '../Components/ui/spinner';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
    signInWithGoogle,
    auth,
    createUserDocument,
} from '../firebase/firebase.util';
import TypeWriter from '../Components/ui/SignInWriter';
import { connect, ConnectedProps } from 'react-redux';
import { storeUser } from '../redux/actions/user.action';
import { setLoader, clearLoader } from '../redux/actions/map.acton';
import { StateInter } from '../interfaces/Global';

const MapStateToProps = (state: StateInter) => ({
    userData: state.user.userData,
    loading: state.map.loading,
});

const MapDispatchToProp = (dispatch: Function) => ({
    storeUserData: (e: any) => dispatch(storeUser(e)),
    setLoader: () => dispatch(setLoader()),
    clearLoader: () => dispatch(clearLoader()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

interface stateInt {
    loading: boolean;
    loggedIn: boolean;
}

const SignIn = (props: Props) => {
    const [state, setState] = useState<stateInt>({
        loading: true,
        loggedIn: false,
    });
    const { loading, loggedIn } = state;
    const { userData, history } = props;
    useEffect(() => {
        // auth.signOut();
        if (!userData.id && !userData.email) {
            auth.onAuthStateChanged(async (user: any) => {
                const userRef: any = await createUserDocument(user);
                if (userRef) {
                    userRef.onSnapshot((snapShot: any) => {
                        props.storeUserData({
                            id: snapShot.id,
                            email: snapShot.data().email,
                        });
                    });
                    setState({ ...state, loggedIn: true });
                    history.push('/');
                }
                setState({ ...state, loading: false });
            });
        } else {
            history.push('/');
        }
    }, []);
    return (
        <Fragment>
            {loading && !loggedIn ? (
                <Spinner />
            ) : (
                <div className="google-btn">
                    <Fragment>
                        <TypeWriter />
                        <GoogleButton
                            className="btn"
                            onClick={signInWithGoogle}
                        />
                    </Fragment>
                </div>
            )}
        </Fragment>
    );
};

export default connector(withRouter(SignIn));
