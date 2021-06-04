import Avatar from '@material-ui/core/Avatar';

// cards for users in friend lists
export function friendCard(props) {

   const profileLink = '/profile/' + props._id;
   const user = JSON.parse(localStorage.getItem('profile')).result;

   return (
      <a className="cardLink" href={user._id === props._id ? '/profile/' : profileLink}>
         <div className="friendCard">
            <div className='profilePhoto'>
               <Avatar src={props.avatar} style={{ height: '52px', width: '52px' }} />
            </div>
            <div className="friendInfo">
               <h2>{props.name}</h2>
               <p className="subTitle">{props.gradDate}, {props.major}</p>
            </div>
         </div>
      </a>
   )
}

// cards for class schedules
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

// cards for each group
export function groupCard(props) {
   const groupLink = '/groups/' + props._id;
   const numMembers = props.members.length;
   return (
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
