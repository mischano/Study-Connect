import { Grid } from '@material-ui/core';
import { getAvailableTimes } from './ScheduleMatch';

const Schedule = ({ users }) => {

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var weekDayIdx = 0;

    return (
        <Grid container direction="row" xs={12} align="center" justify="center">
            {getAvailableTimes(users).map(weekday => {
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
    )
}

export default Schedule;