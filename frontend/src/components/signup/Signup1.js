import React, { useState } from 'react';
import '../../App.css';
import {Button, Select, Grid, Dialog, DialogActions, DialogContent, DialogTitle, FormControl , InputLabel, makeStyles, Input } from "@material-ui/core";
import InputField from '../Auth/Input';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const intitialState = {
    department: '',
    number: '',
    startTime: '',
    endTime: ''
};

function Signup1() 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(intitialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.value);
      };
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);

      };

      return (
          <div>
            Add a Class
            <Grid container space={3}>
              <Grid item xs={3} sm={3}>
          <Button onClick={handleClickOpen}>Department</Button>
          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="demo-dialog-native">Subject</InputLabel>
                  <Select
                    native
                    onChange={handleChange}
                    input={<Input id="demo-dialog-native" />}
                  >
                    <option aria-label="None" />
                    <option>AERO</option>
                    <option>AGB</option>
                    <option>AEPS</option>
                    <option>AGC</option>
                    <option>AGED</option>
                    <option>AG</option>
                    <option>ASCI</option>
                    <option>ANT</option>
                    <option>ARCE</option>
                    <option>ARCH</option>
                    <option>ART</option>
                    <option>ASTR</option>
                    <option>BIO</option>
                    <option>BMED</option>
                    <option>BRAE</option>
                    <option>BOT</option>
                    <option>BUS</option>
                    <option>CHEM</option>
                    <option>CD</option>
                    <option>CHIN</option>
                    <option>CRP</option>
                    <option>CE</option>
                    <option>CLA</option>
                    <option>COMS</option>
                    <option>CPE</option>
                    <option>CSC</option>
                    <option>CM</option>
                    <option>DSCI</option>
                    <option>DANC</option>
                    <option>DATA</option>
                    <option>ESE</option>
                    <option>ESM</option>
                    <option>ERSC</option>
                    <option>ECON</option>
                    <option>EDUC</option>
                    <option>EE</option>
                    <option>ENGR</option>
                    <option>ENGL</option>
                    <option>EDES</option>
                    <option>ENVE</option>
                    <option>ESCI</option>
                    <option>ES</option>
                    <option>FPE</option>
                    <option>FSN</option>
                    <option>FR</option>
                    <option>GEOG</option>
                    <option>GEOL</option>
                    <option>GER</option>
                    <option>GS</option>
                    <option>GSA</option>
                    <option>GSB</option>
                    <option>GSE</option>
                    <option>GSP</option>
                    <option>GRC</option>
                    <option>HLTH</option>
                    <option>HIST</option>
                    <option>HNRS</option>
                    <option>HNRC</option>
                    <option>IME</option>
                    <option>ITP</option>
                    <option>ISLA</option>
                    <option>ITAL</option>
                    <option>JPNS</option>
                    <option>JOUR</option>
                    <option>KINE</option>
                    <option>LA</option>
                    <option>LAES</option>
                    <option>LS</option>
                    <option>MSCI</option>
                    <option>MATE</option>
                    <option>MATH</option>
                    <option>ME</option>
                    <option>MCRO</option>
                    <option>MSL</option>
                    <option>MU</option>
                    <option>NR</option>
                    <option>PHIL</option>
                    <option>PEM</option>
                    <option>PEW</option>
                    <option>PSC</option>
                    <option>PHYS</option>
                    <option>POLS</option>
                    <option>PSY</option>
                    <option>RPTA</option>
                    <option>RELS</option>
                    <option>SCM</option>
                    <option>SOC</option>
                    <option>SS</option>
                    <option>SPAN</option>
                    <option>SPED</option>
                    <option>STAT</option>
                    <option>SIE</option>
                    <option>TH</option>
                    <option>UNIV</option>
                    <option>WVIT</option>
                    <option>WGS</option>
                    <option>WLC</option>
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
              </Grid>
              <Grid item xs={3} sm={3}>
                <InputField name="number" label="Course number" handleChange={handleChange} />
            </Grid>
              <Grid item xs={3} sm={3}>
                <InputField name="startTime" label="start time" handleChange={handleChange} />
              </Grid>
              <Grid item xs={3} sm={3}>
                <InputField name="endTime" label="end time" handleChange={handleChange} />
              </Grid>

            </Grid>
        </div>
      );
  }

export default Signup1;