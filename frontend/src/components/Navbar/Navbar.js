import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import decode from 'jwt-decode';
import logo from '.././Assets/BLACK.png';
import * as api from '../../api/index';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavBarElements';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userName, setUserName] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

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
        api.getProfiles().then(res => {
            res.data.map(user => setUserName(arr => [...arr, user.name]));
        })
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const SearchBar = () => {
        return (
            <div style={{ width: 300 }}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={userName.map((option) => option)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search..." margin="normal" variant="outlined" />
                    )}
                />
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
                <NavMenu>
                    <NavLink to="/dashboard" activeStyle>Dashboard</NavLink>
                    <NavLink to="/groups" activeStyle>Groups</NavLink>
                    <NavLink to="/messages" activeStyle>Messages</NavLink>
                    <NavLink to="/profile" activeStyle>
                        {user ? (user.result.name) : null}
                    </NavLink>
                    <SearchBar />
                </NavMenu>
                <NavBtn>
                    {user ? (null) : <NavBtnLink to="/auth">Login</NavBtnLink>}
                </NavBtn>
                <Button onClick={logout}>Logout</Button>
            </Nav>
        </>
    );
}

export default Navbar;
