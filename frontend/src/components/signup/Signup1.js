import React from 'react';
import '../../App.css';
import {Button, Select, MenuItem, Grid } from "@material-ui/core";

function Signup1() {

    const [value, setValue] = React.useState();

    const handleOnChange = (event) =>
    {
        setValue(event.target.value);
    }

    return (
        <div>
            <header>
                Next, Tell us about your classes
            </header>
            <Grid>
            <Select
                labelId='select a course department'
                id='class-select'
                value={value}
                onChange{... handleOnChange}>
                <MenuItem value={'CPE'}> CPE </MenuItem>
                <MenuItem value={'CSC'}> CSC </MenuItem>
                <MenuItem value={'CHEM'}> CHEM </MenuItem>
            </Select>
                <Select
                    labelId='select a course number'
                    id='class-select'
                    value={value}
                    onChange{... handleOnChange}>
                    <MenuItem value={'CPE'}> CPE </MenuItem>
                    <MenuItem value={'CSC'}> CSC </MenuItem>
                    <MenuItem value={'CHEM'}> CHEM </MenuItem>
                </Select>
            </Grid>
        </div>
    );
}

export default Signup1;