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
                    value="Sunday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="SU"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Monday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="MO"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Tuesday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="TU"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Wednesday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="WE"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Thursday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="TH"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Friday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="FR"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Saturday"
                    control={<Checkbox color="primary" onClick={getValue}/>}
                    label="SA"
                    labelPlacement="top"
                />
            </FormGroup>
        </FormControl>
    );
}

export default WeekDayPicker;