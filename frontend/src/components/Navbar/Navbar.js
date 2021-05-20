import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import decode from 'jwt-decode';
import logo from '.././Assets/BLACK.png';
import * as api from '../../api/index';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavBarElements';

const Navbar = () => {
    const navStyle = { color: 'black' };
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //logouts the user if its been more than an hour
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    // Gets user profiles from the database.
    const getProfiles = async() => {
        const pokemon = [];
        const profiles = await api.getProfiles().then(response => {
            const data = response.data;
            console.log(data);
        })
        .catch(() => {
            alert("error: Navbar.js -> line: 55");
        })
    }
    
    // Search Bar. Need to integrate the databse.
    const SearchBar = () => {
        return (
            <div>
                <input type="text" placeholder="Search..." onClick={getProfiles}/>
            </div>
        );
    }

    return (
        <>
            <Nav>
                <NavLink to="/dashboard">
                    <img id='logo' src={logo} alt='StudyConnect'></img>
                    {/*/*</NavLink><img src={require('./Assets/logo.svg')}*/}
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/dashboard" activeStyle>Dashboard</NavLink>
                    <NavLink to="/groups" activeStyle>Groups</NavLink>
                    <NavLink to="/messages" activeStyle>Messages</NavLink>
                    <NavLink to="/profile" activeStyle>
                        {user ? (user.result.name) : null}
                    </NavLink>
                    <SearchBar/>
                </NavMenu>
                <NavBtn>
                    {user ? (null) : <NavBtnLink to="/auth">Login</NavBtnLink>}
                </NavBtn>
                <Button onClick={logout}>Logout</Button>
            </Nav>
        </>
    );
}


export default Navbar
