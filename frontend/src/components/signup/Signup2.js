import React, { useState } from 'react';
import '../../App.css';
import ClassAdd from './ClassAdd'
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { classAdder } from '../../actions/auth';
import { useHistory } from 'react-router-dom'
import useStyles from "./styles";

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
            <Button className={Classes.addClass} onClick={onAddBtnClick} >Add another Class</Button>
            <Grid container spacing={1} justify="center" alignItems="center">
                <ClassAdd onSubmit={event => classes.push(event)} />
                {inputList}
            </Grid>
            <Button className={Classes.submit} onClick={handleSubmit} >
                Continue
          </Button>
        </div>
    )
}

export default Signup2;