import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import {
    signInWithGoogle,
    auth,
    createUserDocument,
} from '../firebase/firebase.util';
import TypeWriter from './ui/SignInWriter';
import { connect, ConnectedProps } from 'react-redux';
import { storeUser } from '../redux/actions/user.action';

const MapStateToProps = (state: any) => ({
    userData: state.user.userData,
    loading: state.map.loading,
});

const MapDispatchToProp = (dispatch: Function) => ({
    storeUserData: (e: any) => dispatch(storeUser(e)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SignIn = (props: Props) => {
    useEffect(() => {
        auth.onAuthStateChanged(async (user: any) => {
            const userRef: any = await createUserDocument(user);
            userRef.onSnapshot((snapShot: any) => {
                console.log(snapShot.id, snapShot.data().email);
            });
        });
    });
    return (
        <div className="google-btn">
            <TypeWriter />
            <GoogleButton className="btn" onClick={signInWithGoogle} />
        </div>
    );
};

export default connector(SignIn);
