import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getGroup, updatePosts } from '../../actions/group';
import { makePost, getPost } from '../../actions/post';
import { getUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import useStyles from './styles';
import PostForm from './Post'
import Invite from './Invite'
import { updateComments } from '../../actions/post';
import LeaveGroup from './LeaveGroup'
import { updateGroups } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { updateMembers } from '../../actions/group'
import { getAvailableTimes } from '../ScheduleMatch';
import * as api from '../../api/index';

const Group = ({ match }) => {
   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   var weekDayIdx = 0;

   const initialState = {
      title: '',
      message: '',
      _id: '',
      creator: fetchUser().name,
      comments: [],
      likeCount: 0,
      created_at: new Date()
   };

   const classes = useStyles();
   const dispatch = useDispatch();
   
   function fetchUser() {
      if (JSON.parse(localStorage.getItem('profile'))) {
         let user = (JSON.parse(localStorage.getItem('profile'))).result
         return user;
      } else {
         return null;
      }
   }

   //holds the current new post
   const [post, setPost] = useState(initialState);

   //holds the current group
   const [group, setGroup] = useState(null);

   //holds a local copy of the members
   const [members, setMembers] = useState([]);

   //holds a local copy of the posts
   const [posts, setPosts] = useState([]);

   //const member, or not a member
   const [member, setMember] = useState(false);

   // fetches the group from the database
   const fetchGroup = () => {
      getGroup(match.params.id).then(res => setGroup(res));
   }

   //update the comments locally and in database
   const pushComments = (id, comment) => {
      const index = posts.findIndex(post => {
         return post._id === id
      })
      const newPosts = [...posts]
      newPosts[index].comments = newPosts[index].comments.concat([comment]);

      //update comments in database
      updateComments(id, comment);
      //update state
      setPosts(newPosts);
   }

   // set the local state array with the new member
   const addMembers = (members) => {
      members.map(mem => {
         getUser(mem).then(res => setMembers(prev => [...prev, res]))
      })
      members.forEach(mem => api.updateGroups(mem, [match.params.id]));
   }

   // fetches the group on startup
   useEffect(() => {
      fetchGroup();
   }, []);

   // update the post state 
   const handle = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
   };

   // retrieve members from database
   const getMembers = () => {
      group.members.map(mem => {
         getUser(mem).then(res => setMembers(prev => [...prev, res]))
      })
   };

   // retrieve posts from database
   const getPosts = () => {

      //fixes order of posts so newest post is always first
      const newPosts = group.posts.reverse()
      newPosts.map(post => {
         getPost(post).then(res => setPosts(prev => [...prev, res]))
      })

   };

   const updatePostList = (postId) => {

      //set the local post with the id generated from the database
      const newPost = post
      newPost._id = postId
      const newPosts = [newPost].concat(posts);
      setPosts(newPosts);

      //clear the post making state object
      setPost(initialState);

      //update the group in the database posts
      updatePosts(match.params.id, [postId]);
   }

   //call when making a new post
   const addPost = (e) => {
      e.preventDefault();
      //add the new post to the database (post collection)
      makePost(post).then(res => updatePostList(res.data));
   };

   const handleClick = () => {
      dispatch(updateGroups(fetchUser()._id, [match.params.id]));
      updateMembers(match.params.id, [fetchUser()._id])
      setMember(true);
   }

   // retrieve all the posts and members from the database by id on startup
   if (group !== null && members.length === 0 && posts.length === 0 && !member) {
      getMembers();
      getPosts();
      if(group.members.includes((fetchUser()._id)))
         setMember(true);
   }

   return (
      <div>
         {member && <Grid align='center'>
            <Grid item xs={12} sm={6} md={3} spacing={1}>
               <form onSubmit={addPost}>
                  <Paper elevation={3} className={classes.paper}>
                     <Grid align='center'>
                        <Grid item xs={8}>

                           {/* input for the title of the post */}
                           <TextField required name='title' className={classes.field} onChange={handle} variant="outlined" label='title'>
                           </TextField>
                        </Grid>
                        <Grid item xs={8}>

                           {/* input for the body of the post */}
                           <TextField required name='message' onChange={handle} variant="outlined" label='body'>
                           </TextField>
                        </Grid>
                        <Grid item xs={8}>
                           <Button className={classes.submit} type="submit"> Add Post </Button>
                        </Grid>
                     </Grid>
                  </Paper>
               </form>
            </Grid>
         </Grid>}
         {group && (
            <>
               {/* group name */}
               <h1> {group.name} </h1>

               {/*Link to the logged in user's profile */}

               {member && <Link to={'/profile'}> {fetchUser().name}  </Link>}

               {/*list of the members of group, excluding the current user */}
               {members.filter(mem => mem._id !== fetchUser()._id).map((mem, i) => {
                  return <li key={i}>
                     <Link to={`/profile/${mem._id}`} key={mem._id}>{mem.name}</Link>
                  </li>
               })}
               {/* open slots between all users */}
               <Grid container direction="row" xs={12} align="center" justify="center">
               {getAvailableTimes(members).map(weekday => {
                  return (
                     <>
                     <Grid item xs={1}>
                        {weekDays[weekDayIdx++]}
                        {weekday.map(slot => {
                           return <Grid item>{slot[0] + " - " + slot[1]}</Grid>
                        })}
                     </Grid>
                     </>
                  )
               })}
               </Grid>
               {/* use of invite component to invite members */}

               {member && 
               <>
               <Invite group={match.params.id} pushMembers={addMembers} />
               <LeaveGroup group={match.params.id} 
               />
               </>}
               {!member && 
               <Button onClick={handleClick}> Join group </Button>}
               <Grid Container align='center' spacing={1}>

                  {/*Array of posts, formated using Post.js*/}
                  {member && (posts.map((post, i) => {
                     return <PostForm postComment={pushComments} post={post} />
                  }))}
               </Grid>
            </>
         )}
      </div>
   );
}

export default Group;