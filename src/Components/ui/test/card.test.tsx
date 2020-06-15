import React from 'react';
import Card, { cardData } from '../card';
import { shallow } from 'enzyme';

const mockData: cardData = {
    distance: 100,
    name: 'mock-name',
    formattedAddress: [],
};

it('expect to render single component', () => {
    expect(shallow(<Card cardData={mockData} />).length).toBe(1);
});
it('expect to render card component', () => {
    expect(shallow(<Card cardData={mockData} />)).toMatchSnapshot();
});
