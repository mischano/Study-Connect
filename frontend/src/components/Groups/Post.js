import { Button, TextField, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

const PostForm = ({ post, postComment }) => {

    const classes = useStyles();

    const initialState = {
        creator: fetchUser().name,
        message: '',
        created_at: new Date()
    }

    function fetchUser() {
        if (JSON.parse(localStorage.getItem('profile'))) {
           let user = (JSON.parse(localStorage.getItem('profile'))).result
           return user;
        } else {
           return null;
        }
     }

     //on submit, push the comments forward to Group.js
     const submit = (e) =>
     {
         e.preventDefault();
         postComment(post._id, comment);
     }
 
     // set the state array with the new comment
     const handleChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
     };

    const [comment, setComment] = useState(initialState);

    return ( <Grid item xs={12} sm={6} md={3} spacing={2}>
                        <Paper elevation={3}>
                        <Grid container spacing={2} direction='column' alignItems='center'>

                        {/* creator of the post */}
                        <Grid item xs={6} >
                            {'created by: ' + post.creator}
                            </Grid>
                        <Grid item xs={6} >

                        {/* time when the post was created */}
                        {new Date(post.created_at).toLocaleString()}
                        </Grid>
                        <Grid item xs={6} >

                        {/* title of the post */}
                            {post.title}
                            </Grid>
                        <Grid item xs={6} >

                        {/* message of the post */}
                            {post.message}
                        </Grid>
                            
                        {/* renders out the comments*/}
                        {post.comments && post.comments.map((comment, index) => {
                            return <div> {new Date(comment.created_at).toLocaleString() + ' ' + comment.creator + ': ' + comment.message} </div>
                        })}

                        <Grid item xs={6} >
                            <form onSubmit={submit}>
                            <TextField
                                variant='outlined' 
                                onChange={handleChange}
                                name='message'
                                >
                            </TextField>

                            {/* comment submit button */}
                            <Button className={classes.sumbit} type='submit'>
                                Comment
                            </Button>
                            </form>
                        </Grid>
                            </Grid>
                            </Paper>
                    </Grid>
    )}

export default PostForm;