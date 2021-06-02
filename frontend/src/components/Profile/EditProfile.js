import React, { useState } from 'react';
import { editProfile } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import UserAvatar from './UserAvatar';
import { useStyles, CustomEditButton, InputTextField } from './Styles';
import { Save, Cancel } from '@material-ui/icons';
import {
    Button, Dialog, DialogActions, DialogTitle,
    DialogContent, IconButton
} from '@material-ui/core';

function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
        let user = (JSON.parse(localStorage.getItem('profile'))).result;
        return user;
    } else {
        return null;
    }
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

    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const hiddenFileInput = React.useRef(null);

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

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const CustomUploadButton = () => {
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <label htmlFor="contained-button-file">
                    <IconButton
                        component="span"
                        onClick={handleClick} >
                        <UserAvatar />
                    </IconButton>
                </label>
            </div>
        );
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({ ...formData, avatar: base64 });
    }

    const convertBase64 = (file) => {
        return new Promise((res, rej) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                res(fileReader.result);
            };

            fileReader.onerror = (error) => {
                rej(error);
            };
        });
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle id="form-dialog-title" align='center'>
                    <CustomUploadButton />
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={hiddenFileInput}
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                    />
                </DialogTitle>
                <form className={classes.root} noValidate>
                    <DialogContent className={classes.stuff}>
                        <InputTextField
                            className={classes.margin}
                            label="Full Name"
                            required
                            variant="outlined"
                            margin='dense'
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
                            margin='dense'
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
                            margin='dense'
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
                            margin='dense'
                            defaultValue={user.gradDate}
                            name="gradDate"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputTextField
                            className={classes.margin}
                            margin='dense'
                            multiline
                            fullWidth
                            label="Bio"
                            required
                            variant="outlined"
                            defaultValue={user.bio.trim() == "" ? "" : `${user.bio}`}
                            name="bio"
                            onChange={handleChange}
                        />
                    </DialogContent>
                </form>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" size="small" color="primary" startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" size="small" color="primary" startIcon={<Save />}>
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