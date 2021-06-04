import React, { useState } from 'react';
import { editProfile } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import LetterAvatars from './UserAvatar';
import { Save, Cancel } from '@material-ui/icons';
import { useStyles, CustomEditButton, InputTextField } from './Styles';
import {
   Button, Dialog, DialogActions, DialogTitle,
   DialogContent, IconButton
} from '@material-ui/core';
import { fetchUser } from '../GetUser'

const EditProfile = () => {
   const classes = useStyles();
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
   const [open, setOpen] = useState(true);  // To open/close the edit form
   const [formData, setFormData] = useState(initialState); // Store user input data for editing purposes 
   const hiddenFileInput = React.useRef(null); // To hide the custom button behind avatar

   /* Trigger on click input field */
   const handleChange = (e) => {
      // Set the input data to state hook array
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   /* Trigger on click save button */
   const handleSave = () => {
      setOpen(false); // Close the popup form
      dispatch(editProfile(user._id, formData)); // Store the data in the local host
   }

   /* Trigger on click cancel button */
   const handleClose = () => {
      setOpen(false); // Close the popup form
   }

   /* Trigger on button click */
   const handleClick = () => {
      hiddenFileInput.current.click();
   }

   /* Custom upload button to make avatar clickable */
   const CustomUploadButton = () => {
      return (
         <div className={classes.root}>
            <label htmlFor="contained-button-file">
               <IconButton
                  component="span"
                  onClick={handleClick} >
                  <LetterAvatars props={formData} />
               </IconButton>
            </label>
         </div>
      );
   }

   /* Upload the image into the database */
   const uploadImage = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file)

      // update the state hook array with new image
      setFormData({ ...formData, avatar: base64 });
   }

   /* Convert the input file to base64 file to store in database */
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
                     defaultValue={user.bio.trim() === "" ? "" : `${user.bio}`}
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