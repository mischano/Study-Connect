import React, { useEffect, useState } from 'react';
import '../../App.css';
import {Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup} from "@material-ui/core";

const WeekDayPicker = ({handleChange}) => {

    const [Weekdays, setWeekdays] = useState([]);

    //correct order of days
    const days = ["M", "T", "W", "R", "F"];

    useEffect(() => {
       handleChange(Weekdays);
    }, [Weekdays])


    // removes the given day from the array
    function remove(arr, value) {
        return arr.filter(function(ele){
            return ele !== value;
        });
    }

    // sorts the days into the correct order
    const sortDays = function (a, b) {
        a = days.indexOf(a);
        b = days.indexOf(b);
        return a < b ? -1 : 1;
      };

    // adds or removes the day from the weekdays array
    const getValue = (e) => {
        if(Weekdays.includes(e.target.value))
        {
            setWeekdays(remove(Weekdays, e.target.value).sort(sortDays));
        }
        else
        {
            setWeekdays(Weekdays.concat([e.target.value]).sort(sortDays));
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