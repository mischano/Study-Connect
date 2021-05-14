import React, { useState } from 'react';
import '../../App.css';
import ClassAdd from './ClassAdd'
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { classAdder } from '../../actions/auth';
import { useHistory } from 'react-router-dom'
import useStyles from "./styles";
import logo from '../Assets/BLACK.png';

function Signup2() {
    const [inputList, setInputList] = useState([]);
    const [classes, setClasses] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const Classes = useStyles();


    const onAddBtnClick = event => {
        setInputList(inputList.concat(
            <Grid item>
                <ClassAdd onSubmit={event => classes.push(event)} key={inputList.length} />
            </Grid>));
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(classAdder(classes, history))
    };

    return (
        <div>
            <div style={{display: 'inline-block', width:'100%'}}><a href="/"><img id='logo' src={logo} alt='StudyConnect'></img></a></div>
            <h1 style={{textAlign:'center', margin:'auto',padding:'1em'}}>Next, tell us about your classes!</h1>
            <p style={{textAlign:'center', margin:'auto',padding:'1em'}}>Help us find your classmates and build your schedule by choosing which courses you are currently taking. </p>
            <Grid container spacing={1} justify="center" alignItems="center">
                <ClassAdd onSubmit={event => classes.push(event)} />
                {inputList}
            </Grid>
            <div style={{margin:'1.5em auto', padding:'1em', maxWidth: '50em'}}>
                <Button className={Classes.addClass} onClick={onAddBtnClick} style={{float:'left'}}>Add another Class</Button>
                <Button className={Classes.submit} onClick={handleSubmit} style={{float:'right'}}>
                    Continue
                </Button>
            </div>
        </div>
    )
}

export default Signup2;