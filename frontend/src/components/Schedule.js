import { Grid } from '@material-ui/core';
import { getAvailableTimes } from './ScheduleMatch';


const weekdayCardStyle = {
    backgroundColor: '#006494',
    height:'100%',
    borderRadius: '0.75em'
}

const entryStyle = {
    padding: '1em',
    color:'#f5f5f5'
}
const Schedule = ({ users }) => {

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var weekDayIdx = 0;

    return (
        <Grid container direction="row" spacing={2} align="flex-start" justify="flex-start" alignItems="stretch">
            {getAvailableTimes(users).map(weekday => {
                return (
                    <>
                        <Grid item xs={6} md={4} lg={2}><div className="weekdayCard" style={weekdayCardStyle}>
                            <div className="cardEntries" style={entryStyle}>
                            <h3 style={{marginBottom:'0.5em'}}>{weekDays[weekDayIdx++]}</h3>
                            {weekday.map(slot => {
                                return <Grid item xs={12}>{slot[0] + " - " + slot[1]}</Grid>
                            })}</div>
                        </div></Grid>
                    </>
                )
            })}
        </Grid>
    )
}

export default Schedule;