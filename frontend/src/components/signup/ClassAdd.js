import React, { useState } from 'react';
import '../../App.css';
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DepartmentInput from "./DepartmentInput";
import useStyles from "./styles";
import WeekDayPicker from './WeekDayPicker'

const initialState = {
   department: '',
   number: '',
   startTime: "07:30",
   endTime: "07:30",
   weekDays: ''
};

const ClassAdd = ({ onSubmit }) => {
   const [formData, setFormData] = useState(initialState);
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
            <form onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                     <DepartmentInput handleChange={e => setFormData({ ...formData, "department": e })} />
                  </Grid>
                  <Grid item xs={6} md={4}>
                     <TextField required
                        name="number"
                        label="Course number"
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <TextField required name="startTime" id="time"
                        label="Start Time"
                        type="time"
                        variant="outlined"
                        defaultValue="07:30"
                        onChange={handleChange}
                        fullWidth />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <TextField required name="endTime"
                        id="time"
                        label="End Time"
                        type="time"
                        defaultValue="07:30"
                        variant="outlined"
                        onChange={handleChange}
                        fullWidth />
                  </Grid>
                  <Grid item xs={12} align="center">
                     <WeekDayPicker handleChange={e => setFormData({ ...formData, "weekDays": e })} />
                  </Grid>
                  <Grid item xs={12} align="center">
                     <Button className={Classes.confirm} type="submit">
                        Submit
                            </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </div>
   );
}
export default ClassAdd;