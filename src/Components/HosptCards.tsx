import React, { FC, Fragment } from 'react';

import Card from './ui/card';
import { Row, Col } from 'antd';

interface Props {
    hospitalData: [];
}

interface Cardinterface {
    name: string;
}
const CardComponent: FC<Props> = ({ hospitalData }) => {
    const style = { marginTop: '20px' };
    const HospitalsCard = hospitalData.map((el, i): any => {
        return (
            <Col key={i} sm={12} xs={24} md={12} lg={6}>
                <div style={style}>
                    <Card cardData={el} />
                </div>
            </Col>
        );
    });

    return (
        <Fragment>
            <div className="cards-container">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {HospitalsCard}
                </Row>
            </div>
        </Fragment>
    );
};

export default CardComponent;
