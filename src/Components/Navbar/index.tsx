import React, { FC } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const Navbar: FC = () => {
    return (
        <Header>
            <div className="logo">Hospital Finder</div>
        </Header>
    );
};

export default Navbar;
