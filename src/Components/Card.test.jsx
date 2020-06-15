import React from 'react';
import Card from './HosptCards';
import { shallow } from 'enzyme';

const mockData = [{}];

it('expect to render single component', () => {
    expect(shallow(<Card hospitalData={mockData} />).length).toBe(1);
});
