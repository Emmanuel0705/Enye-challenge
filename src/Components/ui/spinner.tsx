import React, { FC } from 'react';
import { Spin } from 'antd';

const Spinner: FC = () => {
    return (
        <div className="large-container">
            <Spin size="large" tip="Loading............"></Spin>
        </div>
    );
};

export default Spinner;
