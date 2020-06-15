import React from 'react';
import SkeletonCard from '../cardSkeleton';
import { shallow } from 'enzyme';

it('expect to render single component', () => {
    expect(shallow(<SkeletonCard />).length).toBe(1);
});
it('expect to render SkeletonCard component', () => {
    expect(shallow(<SkeletonCard />)).toMatchSnapshot();
});
