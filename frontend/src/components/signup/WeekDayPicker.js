import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import {Button, Grid, TextField, Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup} from "@material-ui/core";
import InputField from "../Auth/Input";
import ClassAdd from "./ClassAdd";

const WeekDayPicker = ({handleChange}) => {

    const [Weekdays, setWeekdays] = useState([])

    useEffect(() => {
       handleChange(Weekdays)
    }, [Weekdays])


    function remove(arr, value) {

        return arr.filter(function(ele){
            return ele !== value;
        });
    }

    const getValue = (e) => {
        if(Weekdays.includes(e.target.value))
        {
            setWeekdays(remove(Weekdays, e.target.value))
        }
        else
        {
                setWeekdays(Weekdays.concat([e.target.value]));
        }
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"> </FormLabel>
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="M"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="MO"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="T"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="TU"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="W"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="WE"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="R"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="TH"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="F"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="FR"
                    labelPlacement="top"
                />
            </FormGroup>
        </FormControl>
    );
}

export default WeekDayPicker;