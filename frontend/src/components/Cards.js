import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'center',
//         '& > *': {
//             margin: theme.spacing(1),
//         },
//     },
//     large: {
//         width: theme.spacing(13),
//         height: theme.spacing(13),
//     },
//     orange: {
//         color: theme.palette.getContrastText(deepOrange[500]),
//         backgroundColor: deepOrange[500],
//     },
//     purple: {
//         color: theme.palette.getContrastText(deepPurple[500]),
//         backgroundColor: deepPurple[500],
//     },
// }));

export function friendCard(props){
    // const classes = useStyles();
    const profileLink = '/profile/' + props._id;
    return(
       <a className="cardLink" href={profileLink}>
          <div className="friendCard">
             <div className='profilePhoto'>
                <Avatar src={props.avatar} style={{ height:'52px', width: '52px' }}/>
             </div>
             <div className="friendInfo">
                <h2>{props.name}</h2>
                <p className="subTitle">{props.gradDate}, {props.major}</p>
             </div>
          </div>
       </a>
    )
 }

 export function classCard(props) {
    return (
       <div className='classCard'>
          <h2 className="courseTitle">{props.department + " " + props.number}</h2>
          <div className="classInfo">
             <p className='subTitle'>{props.startTime + "-" + props.endTime}</p>
             <p className='subTitle'>{props.weekDays}</p>
          </div>
       </div>
    )
 }

 export function groupCard(props){
   const groupLink = '/groups/' + props._id;
   const numMembers = props.members.length;
   return(
      <a className="cardLink" href={groupLink}>
         <div className="groupCard">
            <div className="groupInfo">
               <h2>{props.name}</h2>
               <p className="subTitle">{numMembers} members</p>
            </div>
         </div>
      </a>
   )
}

