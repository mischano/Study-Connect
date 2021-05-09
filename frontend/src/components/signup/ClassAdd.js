import React, { useState } from 'react';
import '../../App.css';
import {Button, Container, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import DepartmentInput from "./DepartmentInput";
import useStyles from "./styles";

  const intitialState = {
    department: '',
    number: '',
    startTime: '',
    endTime: ''
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
            <Container component="main" maxWidth="xs">
                <Paper className={Classes.paper} elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <DepartmentInput handleChange={e => setFormData({...formData, ["department"]: e})}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <TextField required name="number"
                                       label="Course number"
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField required name="startTime" id="time"
                                       label="Start Time"
                                       type="time"
                                       variant="outlined"
                                       onChange={handleChange}
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField required name="endTime"
                                       id="time"
                                       label="End Time"
                                       type="time"
                                       variant="outlined"
                                       onChange={handleChange}
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button className={Classes.confirm} onClick={handleSubmit}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
export default ClassAdd;