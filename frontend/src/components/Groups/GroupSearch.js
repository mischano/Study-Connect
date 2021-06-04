import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as api from '../../api/index';
import '../../App.css';

/* Search for existing group */
const GroupSearch = () => {
   const [autoCompleteVal, setAutoCompleteVal] = useState(null);
   const [groups, setGroups] = useState([]);

   /* Get group data from database */
   useEffect(() => {
      api.getAllGroups().then(res => {
         res.data.map(person => setGroups(arr => [...arr, person]));
      })
   }, [])

   return (
      <div style={{ width: 300 }}>
         <Autocomplete
            value={autoCompleteVal}
            id="groups-search"
            options={groups}
            getOptionLabel={(option) => option.name}
            onChange={(e, newVal) => {
               setAutoCompleteVal(newVal);
            }}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label="Search..."
                  margin="normal"
                  variant="outlined"
                  onKeyDown={e => {
                     if (e.key === "Enter") {
                        window.location.assign(`/groups/${autoCompleteVal._id}`);
                     }
                  }}
               />
            )}
         />
      </div>
   );
}

export default GroupSearch;