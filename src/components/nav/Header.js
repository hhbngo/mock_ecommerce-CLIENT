import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');
    const history = useHistory();

    return (
        <Menu mode="horizontal" selectedKeys={[current]} onClick={e => setCurrent(e.key)}>
            <Item key="home">
                <Link to="/">Home</Link>
            </Item>
            <Item key="register" className="float-right">
                <Link to="/register">Register</Link>
            </Item>
            <Item key="login" className="float-right">
                <Link to="/login">Login</Link>
            </Item>
        </Menu>
    )
}

export default Header








