import React, { useState } from 'react';
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

const CustomButton = withStyles((theme) => ({
    root: {
        fontSize: 12,
        fontStyle: 'italic',
        font: 'Apple Color Emoji',
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: teal[700],
        '&:hover': {
            backgroundColor: teal[800],
        },
    },
}))(Button);

const CustomTextField = withStyles((theme) => ({
    root: {
        width: 300,
    },
    // helperText:"First Name",
}))(TextField);

const EditProfile = () => {
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle id="form-dialog-title">Edit Account</DialogTitle>
                <DialogContent>
                    <CustomTextField label="First Name" type="firstName" id="f" autoFocus />
                </ DialogContent>
                <DialogContent>
                    <CustomTextField label="Last Name" type="lastName" id="l" autoFocus />
                </ DialogContent>
                <DialogContent>
                    <CustomTextField label="Email Address" type="email" id="e" autoFocus />
                </ DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                            </Button>
                    <Button onClick={handleClose} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

}

export {
    EditProfile,
    CustomButton
};
