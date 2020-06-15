import React, { ReactElement, Component, FC } from 'react';
import { Layout } from './Layout';
import { shallow } from 'enzyme';
import { mockComponent } from 'react-dom/test-utils';

it('expect to render single component', () => {
    expect(shallow(<Layout Component={mockComponent} />).length).toBe(1);
});
