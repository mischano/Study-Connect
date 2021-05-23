import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import {FaBars} from 'react-icons/fa';

export const Nav = styled.nav`
    background: #fff; 
    height: 80px; 
    display: flex; 
    // justify-content: space-between; 
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 999; 

    // left side nav 
    justify-content: flex-start;

`
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

export const Bars = styled(FaBars)`
    display: none; 
    color: #041923; 

    // hamburger will only show at this width
    @media screen and (max-width: 760px) { 
        display: block; 
        position: absolute; 
        top: 0; 
        right: 0; 
        transform: translate(-100%, 75%); 
        font-size: 1.8rem; 
        cursor: pointer; 
    }
`  

export const NavMenu = styled.div`
    display: flex; 
    align-items: center; 
    // margin-right: -24px; 

    // left-side nav
    width: 100vw; 
    white-space: nowrap; 

    //nav menu will disappear and only hamburger will show
    @media screen and (max-width: 768px){ 
        display: none;

    }
`

export const NavBtn= styled.nav`
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