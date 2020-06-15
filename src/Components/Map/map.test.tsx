import React from 'react';
import Map from './index';
import { shallow } from 'enzyme';

const mockData = [{}];

it('expect to render single component', () => {
    expect(shallow(<Map hospitalData={mockData} />).length).toBe(1);
});
it('expect to render SkeletonCard component', () => {
    expect(shallow(<Map hospitalData={mockData} />)).toMatchSnapshot();
});
