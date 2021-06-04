import React from 'react';
import '../../App.css';
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const DepartmentInput = ({ handleChange }) => {

   // list of all Cal Poly departments
   const options = ["AERO", "AGB", "AGC", "AGED", "AGB", "AEPS", "AGC", "AGED", "AG",
      "ASCI", "ANT", "ARCE", "ARCH", "ART", "ASTR", "BIO", "BMED", "BRAE", "BOT", "BUS",
      "CHEM", "CD", "CHIN", "CRP", "CE", "CLA", "COMS", "CPE", "CSC", "CM", "DSCI", "DANC",
      "DATA", "ESE", "ESM", "ERSC", "ECON", "EDUC", "EE", "ENGR", "ENGL", "EDES", "ENVE",
      "ESCI", "ES", "FPE", "FSN", "FR", "GEOG", "GEOL", "GER", "GS", 'GSA', 'GSB', 'GSE',
      'GSP', 'GRC', 'HLTH', 'HIST', 'HNRS', 'HNRC', 'IME', 'ITP', 'ISLA', 'ITAL', 'JPNS',
      'JOUR', 'KINE', 'LA', 'LAES', 'LS', 'MSCI', 'MATE', 'MATH', 'ME', 'MCRO', 'MSL',
      'MU', 'NR', 'PHIL', 'PEM', 'PEW', 'PSC', 'PHYS', 'POLS', 'PSY', 'RPTA', 'RELS',
      'SCM', 'SOC', 'SS', 'SPAN', 'SPED', 'STAT', 'SIE', 'TH', 'UNIV', "WVIT", "WGS",
      "WLC"]
   const [value, setValue] = React.useState(options[0]);

   return (
      <Autocomplete
         value={value}
         onChange={(event, newValue) => {
            setValue(newValue);
            handleChange(newValue)
         }}
         id="controllable-states-demo"
         options={options}
         renderInput={(params) => <TextField {...params} label="Departments" variant="outlined" required />}
      />
   );
};

export default DepartmentInput;