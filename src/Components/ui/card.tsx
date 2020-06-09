import React, { FC, Fragment } from 'react';
import { Card } from 'antd';

interface cardData {
    name: string;
    address: string;
    city: string;
    state: string;
    distance: number;
    formattedAddress: any[];
}

interface Props {
    cardData: cardData;
}

const CardComponent: FC<Props> = ({ cardData }) => {
    if (cardData.formattedAddress[0] === undefined)
        cardData.formattedAddress[0] = '...';

    if (cardData.formattedAddress[1] === undefined)
        cardData.formattedAddress[1] = '...';
    if (cardData.formattedAddress[2] === undefined)
        cardData.formattedAddress[2] = '...';

    return (
        <Fragment>
            <Card title={cardData.name} bordered={false}>
                <p>
                    <b>Address: </b>{' '}
                    {`${cardData.formattedAddress[0]}, 
                ${cardData.formattedAddress[1]},
                ${cardData.formattedAddress[2]}`}
                </p>
                <p>
                    <b>Distance: </b> {Math.floor(cardData.distance / 100)}
                    {''}
                    km away
                </p>
            </Card>
        </Fragment>
    );
};

export default CardComponent;
