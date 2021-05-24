export function friendCard(props){
    const profileLink = '/profile/' + props._id;
    return(
       <a className="cardLink" href={profileLink}>
          <div className="friendCard">
             <div className='profilePhoto'></div>
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