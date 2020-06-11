import React, { FC } from 'react';

import Typing from 'react-typing-animation';

const AnimatedTypingComponent: FC = () => (
    <Typing>
        <Typing.Speed ms={60} />
        <b className="writer-b">Instruction on how to use this Section </b>
        <Typing.Speed ms={60} />
        <p className="writer-p">
            Navigate To Hospital Tab Pane to view hospitals past search results
        </p>
        <p className="writer-p">
            Navigate To Pharmacies Tab Pane to view Pharmacies past search
            results
        </p>
        <p className="writer-p">
            Navigate To Clinic Tab Pane to view Clinic past search results
        </p>
        <p className="writer-p">
            Navigate To Meical Offices Tab Pane to view Medical offices past
            search results
        </p>
        {/* <Typing.Backspace count={20} /> */}
    </Typing>
);

export default AnimatedTypingComponent;
