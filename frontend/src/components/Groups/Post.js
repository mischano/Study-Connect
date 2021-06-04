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

    return ( 
        <Grid item xs={10} sm={8}>
            <Paper className= {classes.paper} elevation={3}>
            <Grid container spacing={2} direction='row' justify ='left' >

            {/* creator of the post */}
                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <h4>{post.creator}</h4>
                </Grid>

                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                    {/* time when the post was created */}
                    {new Date(post.created_at).toLocaleString()}
                </Grid>
                
                
                
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                    {/* message of the post */}
                    <p>{post.message}</p>
                </Grid>


                {/* renders out the comments*/}
                <Grid item xs={12} style={{ display: "block", justifyContent: "flex-start"}}>
                {post.comments && post.comments.map((comment, index) => {

                    return <div className={classes.postedComment}> 
                        
                        <h4>{comment.creator}</h4>
                        <div className={classes.postedComment}> 
                        {comment.message}
                        </div>
                        {new Date(comment.created_at).toLocaleString()}

                        
                        </div>

                })}
                </Grid>

                    <Grid item xs={12} >
                    <form onSubmit={submit}>
                    </form>
                
                {/* text field and comment button */}
                <Grid container spacing={2} direction='column' align-items='left'>
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
                            </Grid>
                            </Paper>
                    </Grid>
    )}

export default PostForm;