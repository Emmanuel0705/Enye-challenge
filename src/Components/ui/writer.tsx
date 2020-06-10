import React, { FC } from 'react';

import Typing from 'react-typing-animation';

const AnimatedTypingComponent: FC = () => (
    <Typing>
        <Typing.Speed ms={90} />
        <b className="writer-b">Welcome to Hospital Finder </b>
        <Typing.Speed ms={100} />
        <p className="writer-p">
            {' '}
            singin with your google account to find any hospital with your area{' '}
        </p>
        {/* <Typing.Backspace count={20} /> */}
    </Typing>
);

export default AnimatedTypingComponent;
