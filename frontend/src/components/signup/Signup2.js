import React, { useState } from 'react';
import '../../App.css';
import Signup1 from './Signup1'

function Signup2()
{
   const [inputList, setInputList] = useState([]);

   const onAddBtnClick = event => {
      setInputList(inputList.concat(<Signup1 key={inputList.length} />));
   };

   return (
       <div>
          <button onClick={onAddBtnClick}>Add a Class</button>
          {inputList}
       </div>
   )
}

export default Signup2;