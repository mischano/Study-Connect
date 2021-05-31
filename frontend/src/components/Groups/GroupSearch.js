import React, { useState, useEffect } from 'react';
import '../../App.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as api from '../../api/index';

const GroupSearch = () => {

    const [autoCompleteVal, setAutoCompleteVal] = useState(null);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        api.getGroups().then(res => {
            res.data.map(group => setGroups(arr => [...arr, group]));
     })}, [])

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