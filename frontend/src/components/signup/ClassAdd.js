import React, { useState } from 'react';
import '../../App.css';
import {Button, Container, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import DepartmentInput from "./DepartmentInput";
import useStyles from "./styles";
import WeekDayPicker from './WeekDayPicker'

  const intitialState = {
    department: '',
    number: '',
    startTime: '',
    endTime: '',
    weekDays: ''
};

const ClassAdd = ({onSubmit}) =>
{
    const [formData, setFormData] = useState(intitialState);
    const Classes = useStyles();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
                <Paper className={Classes.paper} elevation={3}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={1}>
                            <DepartmentInput handleChange={e => setFormData({...formData, ["department"]: e})}/>
                        </Grid>
                        <Grid item xs={1}>

                            <TextField required name="number"
                                       label="Course number"
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField required name="startTime" id="time"
                                       label="Start Time"
                                       type="time"
                                       variant="outlined"
                                       defaultValue="07:30"
                                       onChange={handleChange}
                                       fullWidth/>
                        </Grid>
                        <Grid item md={2}>
                            <TextField required name="endTime"
                                       id="time"
                                       label="End Time"
                                       type="time"
                                       defaultValue="07:30"
                                       variant="outlined"
                                       onChange={handleChange}
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={5}>
                        <WeekDayPicker handleChange={e => setFormData({...formData, ["weekdays"]: e})}/>
                        </Grid>
                        <Grid item md={1}>
                            <Button className={Classes.confirm} onClick={handleSubmit}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
        </div>
    );
}
export default ClassAdd;