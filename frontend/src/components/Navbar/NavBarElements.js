import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

//entire nav component
export const Nav = styled.nav`
    background: #fff; 
    height: 80px; 
    display: flex; 
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 999; //put the navbar above other content

    // left side nav 
    justify-content: flex-start;

`
//Navigation tabs that link to other routes
export const NavLink = styled(Link)`
    color: #465963; 
    display: flex; 
    align-items: center; 
    text-decoration: none; 
    letter-spacing: .5px;
    padding: 0 1rem; 
    height: 100%; 
    cursor: pointer; 

    //selected tab
    &.active { 
        color: #041923; 
        font-weight: bold; 
    }

    &:hover{ 
        font-weight: bold;
        transition: all 0.2s ease-in-out;
    }
`

//Items in menu 
export const NavMenu = styled.div`
    display: flex; 
    align-items: center; 

    // left-side nav
    width: 100vw; 
    white-space: nowrap; 

    //nav menu will disappear and only hamburger will show
    @media screen and (max-width: 768px){ 
        display: none;
    }
`

//Login Button styling
export const NavBtn = styled.nav`
    display: flex; 
    align-items: center;
    margin-right: 24px; 

    // left side nav
    justify-content: flex-end; 
    width: 100vw; 

    //button will disappear 
    @media screen and (max-width: 768px){ 
        display: none;
    }
`
//Login text link
export const NavBtnLink = styled(Link)`
    border-radius: 4px; 
    background: #E5623B; 
    padding: 10px 22px; 
    color: #fff; 
    border: none; 
    outline: none; 
    cursor: pointer; 
    transition: all 0.2s ease-in-out;
    text-decoration: none; 
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #E5623B
        color: #000; 
    }
`
