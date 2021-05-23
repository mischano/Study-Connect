import React, { useEffect, useState } from 'react';
import '../App.css';
import { getUser } from '../actions/auth';
import { Grid, Typography, CardContent, Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
       minWidth: 275,
       padding: 5,
       backgroundColor: "white",
       border: "1px solid blue",
       width: "33%",
       borderRadius: 20,
       marginTop: theme.spacing(3),
       marginLeft: theme.spacing(10)
    },
    title: {
       fontSize: 25,
       color: 'blue',
       fontWeight: "fontWeightBold"
    },
    pos: {
       marginBottom: 25,
       fontSize: 20,
       color: 'blue',
       fontWeight: "fontWeightBold"
    },
 }));

const Friend = ({ match }) => {
    const [friend, setFriend] = useState(null);
    const classes = useStyles();
    const getFriend = async () => {
       const user = await getUser(match.params.id);
       setFriend(user);
    }

    useEffect(() => 
    {
        getFriend();
    });

    return (
      <div>
        {friend && (
            <>
            <h1> {friend.name} </h1>
            <h1> {friend.major}</h1>
            <h1> {friend.gradDate}</h1>
            <Grid className="classes">
            <h2 className="sectionHeader">Classes</h2>
            <Grid container spacing={4} direction={'column'} justify="space-evenly">
            {friend.classes.map(course => (
                <Card className={classes.root} border={1}>
                    <CardContent>
                        <Grid container direction={'row'}>
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {course.department + " " + course.number}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography className={classes.title} color="textSecondary">
                            {course.startTime + "-" + course.endTime}
                        </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <Typography className={classes.title} color="textSecondary">
                            {course.weekDays}
                        </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            </Grid>
            </Grid>
            </>
        )}
       </div>
    );
 }
 
 export default Friend;