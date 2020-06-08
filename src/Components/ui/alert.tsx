import React, { FC } from 'react';
import { Alert } from 'antd';
interface Prop {
    message: string;
    description: string;
}

const AlertComponent: FC<Prop> = ({ message, description }) => {
    return (
        <div className="large-container">
            <Alert
                message={message}
                description={description}
                type="error"
                showIcon
            />
        </div>
    );
};

export default AlertComponent;
