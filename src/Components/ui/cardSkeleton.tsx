import React, { FC, Fragment } from 'react';
import { Card, Skeleton } from 'antd';

const SkeletonComponent: FC = () => {
    return (
        <Fragment>
            <Card title={'.............'} bordered={false}>
                <Skeleton paragraph={{ rows: 3 }} />
            </Card>
        </Fragment>
    );
};

export default SkeletonComponent;
