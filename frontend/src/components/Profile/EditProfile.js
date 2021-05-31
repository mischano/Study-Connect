import React, { useState, useRef } from 'react';
import { editName, editMajor } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from './UserAvatar';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { teal } from '@material-ui/core/colors';

function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
        let user = (JSON.parse(localStorage.getItem('profile'))).result;
        return user;
    } else {
        return null;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const CustomEditButton = withStyles((theme) => ({
    root: {
        fontSize: 12,
        fontStyle: 'italic',
        font: 'Apple Color Emoji',
        color: theme.palette.getContrastText(teal[700]),
        backgroundColor: teal[700],
        '&:hover': {
            backgroundColor: teal[800],
        },
        size: {
            fontStyle: 'normal',
        },
    },
}))(Button);

const CustomUploadButton = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <UserAvatar />
                </IconButton>
            </label>
        </div>
    );
}

const InputTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'tile',
            borderWidth: 1,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 1,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 4,
            borderColor: 'green',
            padding: '4px !important', // override inline-style
        },
    },
})(TextField)

const EditProfile = () => {
    const [open, setOpen] = useState(true);
    const user = fetchUser();
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const nameRef = useRef('');
    const majorRef = useRef('');
    const gradRef = useRef('');

    const handleSave = () => {
        setOpen(false);
        console.log(nameRef.current.value);
        dispatch(editName(user._id, { data: nameRef.current.value }));
        dispatch(editMajor(user._id, { data: majorRef.current.value }));
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle id="form-dialog-title" align='center'>
                    <CustomUploadButton />
                </DialogTitle>
                <form className={classes.root} noValidate>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Full Name"
                            required
                            variant="outlined"
                            defaultValue={user.name}
                            id="validation-outlined-input"
                            inputRef={nameRef}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Email Address"
                            required
                            variant="outlined"
                            defaultValue={user.email}
                            id="validation-outlined-input"
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Major"
                            required
                            variant="outlined"
                            defaultValue={user.major}
                            id="validation-outlined-input"
                            inputRef={majorRef}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Graduation Date"
                            required
                            variant="outlined"
                            defaultValue={user.gradDate}
                            id="validation-outlined-input"
                            inputRef={gradRef}
                        />
                    </DialogContent>
                </form>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" size="small" color="primary" startIcon={<CancelIcon/>}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" size="small" color="primary" startIcon={<SaveIcon/>}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

}

export {
    EditProfile,
    CustomEditButton
};
