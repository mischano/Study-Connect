import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import { TextField } from "@material-ui/core";
import InputField from "../Auth/Input";
   
const DepartmentInput = ({handleChange}) => {
   const [display, setDisplay] = useState(false);
   const [options, setOptions] = useState([]);
   const [search, setSearch] = useState("");
   const wrapperRef = useRef(null);

   useEffect(() => {
      const departments = ["AERO", "AGB", "AGC", "AGED", "AGB", "AEPS", "AGC", "AGED", "AG",
      "ASCI", "ANT", "ARCE", "ARCH", "ART", "ASTR", "BIO", "BMED", "BRAE", "BOT", "BUS",
      "CHEM", "CD", "CHIN", "CRP", "CE", "CLA", "COMS", "CPE", "CSC", "CM", "DSCI", "DANC",
      "DATA", "ESE", "ESM", "ERSC", "ECON", "EDUC", "EE", "ENGR", "ENGL", "EDES", "ENVE",
      "ESCI", "ES", "FPE", "FSN", "FR", "GEOG", "GEOL", "GER", "GS", 'GSA', 'GSB', 'GSE',
      'GSP', 'GRC', 'HLTH', 'HIST', 'HNRS', 'HNRC', 'IME', 'ITP', 'ISLA', 'ITAL', 'JPNS',
      'JOUR', 'KINE', 'LA', 'LAES', 'LS', 'MSCI', 'MATE', 'MATH', 'ME', 'MCRO', 'MSL',
      'MU', 'NR', 'PHIL', 'PEM', 'PEW', 'PSC', 'PHYS', 'POLS', 'PSY', 'RPTA', 'RELS',
      'SCM', 'SOC', 'SS', 'SPAN', 'SPED', 'STAT', 'SIE', 'TH', 'UNIV', "WVIT", "WGS",
      "WLC"]
      setOptions(departments);
   }, []);

   useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
         window.removeEventListener("mousedown", handleClickOutside);
      };
   });

   const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
         setDisplay(false);
      }
   };

   const updateSearchBar = name => {
      setSearch(name);
      setDisplay(false);
      handleChange(name);
   };

   return (
       <div ref={wrapperRef} className="flex-container flex-column pos-rel">
          <TextField
              id="auto"
              fullWidth
              variant="outlined"
              onClick={() => setDisplay(!display)}
              placeholder="Department"
              required
              value={search}
              onChange={event => setSearch(event.target.value)}
          />
          {display && (
              <div className="autoContainer">
                 {options
                     .filter(name => name.indexOf(search.toUpperCase()) > -1)
                     .map((value, i) => {
                        return (
                            <div
                                onClick={() => updateSearchBar(value)}
                                className="option"
                                key={i}
                                tabIndex="0"
                            >
                               <span>{value}</span>
                            </div>
                        );
                     })}
              </div>
          )}
       </div>
   );
};

export default DepartmentInput;