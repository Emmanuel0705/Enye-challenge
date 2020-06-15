import React from 'react';
import Spinner from '../spinner';
import { shallow } from 'enzyme';

it('expect to render single component', () => {
    expect(shallow(<Spinner />).length).toBe(1);
});
it('expect to render SkeletonCard component', () => {
    expect(shallow(<Spinner />)).toMatchSnapshot();
});
