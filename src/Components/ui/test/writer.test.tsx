import React from 'react';
import Writer from '../writer';
import { shallow } from 'enzyme';

it('expect to render single component', () => {
    expect(shallow(<Writer />).length).toBe(1);
});
it('expect to render SkeletonCard component', () => {
    expect(shallow(<Writer />)).toMatchSnapshot();
});
