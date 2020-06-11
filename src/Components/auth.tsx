import React, { FC } from 'react';
import GoogleButton from 'react-google-button';
// import { signInWithGoogle } from '../firebase/firebase.util';
import TypeWriter from './ui/writer';
interface Props {
    onClick: Function;
}

const SignIn: FC<Props> = () => {
    return (
        <div className="google-btn">
            <TypeWriter />
            {/* <GoogleButton className="btn" onClick={signInWithGoogle} /> */}
        </div>
    );
};

export default SignIn;
