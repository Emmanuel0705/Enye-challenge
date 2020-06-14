import React, { FC } from 'react';

import Typing from 'react-typing-animation';

const AnimatedTypingComponent: FC = () => (
    <Typing>
        <Typing.Speed ms={60} />
        <b className="writer-b">Welcome to Hospital locator </b>
        <Typing.Speed ms={60} />
        <p className="writer-p">
            Kindly signIn With your Google account to get started
        </p>
    </Typing>
);

export default AnimatedTypingComponent;
