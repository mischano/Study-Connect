import React, { useEffect, useState } from 'react';
import '../../App.css';
import { getGroup, updatePosts } from '../../actions/group';
import { makePost, getPost } from '../../actions/post';
import { getUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Paper, Menu, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import PostForm from './Post'
import Invite from './Invite'
import { updateComments } from '../../actions/post';
import LeaveGroup from './LeaveGroup'
import { updateGroups } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { updateMembers } from '../../actions/group'
import { getAvailableTimes } from '../ScheduleMatch';
import { friendCard } from '../Cards';
import * as api from '../../api/index';
import Schedule from '../Schedule';
import Avatar from '@material-ui/core/Avatar'

const bannerTheme = {
   width: '100%',
   // height: '100%',
   background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://blog-www.pods.com/wp-content/uploads/2020/05/SF-Neighborhoods-Feature-photo-.jpg)",
   backgroundSize: '100% 100%',
   padding: '2em'
}

const Group = ({ match }) => {

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
      if (group.members.includes((fetchUser()._id)))
         setMember(true);
   }

   return (
      <div>
         {group && (
            <>
            <div style={bannerTheme}>
               {/* group name */}

               <Grid container alignItems='center' justify='center' direction='row'>

                     <h1 style={{color: "white"}}> {group.name} </h1>
                     {member &&
                           <>
                              <Invite group={match.params.id} pushMembers={addMembers} />
                              <LeaveGroup group={match.params.id}/>
                           </>}
                        {!member &&
                           <Button className={classes.invite} onClick={handleClick}> Join group </Button>}
                        
                  {/*current user*/}
                  <Grid item xs={12}>
                  <Grid container alignItems='center' justify='center' direction='row' spacing={3}>
                     {/* users name and profile picture */}
                     <Grid item>
                        <Grid container direction='row'>
                           <Grid item>
                              <Avatar src={fetchUser().avatar} style={{ height: '40px', width: '40px' }} />
                           </Grid>
                           <Grid item>
                              {member && <MenuItem style={{color: "white"}} component={Link} to={'/profile'}> {fetchUser().name}  </MenuItem>}
                           </Grid>
                        </Grid>
                     </Grid>

                     {/* members names and profile picture */}
                     {members.filter(mem => mem._id !== fetchUser()._id).map((mem, i) => {
                        return <>
                           <Grid item>
                              <Grid container direction='row'>
                                 <Grid item>
                                    <Avatar src={mem.avatar} style={{ height: '40px', width: '40px' }} />
                                 </Grid>
                                 <Grid item>
                                    <MenuItem style={{color: "white"}} component={Link} to={`/profile/${mem._id}`} key={mem._id}>{mem.name}</MenuItem>
                                 </Grid>
                              </Grid>
                           </Grid>
                        </>
                     })}
                     </Grid>
                  </Grid>
               </Grid>
               </div>

               
                {/* open slots between all users */}
                <div className="scheduleMatch">
                        <h2 className="sectionHeader">Available Times to Meet</h2>
                <div className="GroupPageMatches"><Schedule users={members}></Schedule></div>
                </div>

               {/* use of invite component to invite members */}

            </>
         )}
         {member && <Grid align='center'>
            <Grid item xs={10} sm={8} spacing={1}>
               <form onSubmit={addPost}>
                  <Paper elevation={3} className={classes.paper}>
                     <Grid container spacing={2} justify ='center'>
                        <Grid item xs={8}>

                           {/* input for the body of the post */}

                              <TextField required name='message' className={classes.field} onChange={handle} variant="outlined" label='Write a post...'>
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
         <Grid Container align='center' spacing={1}>

            {/*Array of posts, formated using Post.js*/}
            {member && (posts.map((post, i) => {
               return <PostForm postComment={pushComments} post={post} />
            }))}
         </Grid>
      </div>
   );
}

export default Group;