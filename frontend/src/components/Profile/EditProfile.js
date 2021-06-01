import React, { useState } from 'react';
import { editProfile } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import UserAvatar from './UserAvatar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { teal } from '@material-ui/core/colors';
import {
    withStyles, makeStyles, Button, TextField, Dialog,
    DialogActions, DialogTitle, DialogContent
} from '@material-ui/core';


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
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <UserAvatar />
                </IconButton>
            </label>
        </div>
    );
}

const EditProfile = () => {
    const user = fetchUser();
    const initialState = ({
        name: user.name,
        email: user.email,
        major: user.major,
        gradDate: user.gradDate,
        bio: user.bio,
        avatar: user.avatar
    });

    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setOpen(false);
        dispatch(editProfile(user._id, formData));
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle id="form-dialog-title" align='center'>
                    <UserAvatar />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setFormData({ ...formData, avatar: base64 })}
                        />
                    </div>
                </DialogTitle>
                <form className={classes.root} noValidate>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Full Name"
                            required
                            variant="outlined"
                            defaultValue={user.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Email Address"
                            required
                            variant="outlined"
                            defaultValue={user.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Major"
                            required
                            variant="outlined"
                            defaultValue={user.major}
                            name="major"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            label="Graduation Date"
                            required
                            variant="outlined"
                            defaultValue={user.gradDate}
                            name="gradDate"
                            onChange={handleChange}
                        />
                    </DialogContent>
                </form>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" size="small" color="primary" startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" size="small" color="primary" startIcon={<SaveIcon />}>
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