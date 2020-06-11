import React, { FC } from 'react';
import { Spin } from 'antd';

const CardComponent: FC = () => {
    return (
        <div className="large-container">
            <Spin size="large" tip="Loading............"></Spin>
        </div>
    );
};

export default CardComponent;
