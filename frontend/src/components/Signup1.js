import React from 'react';
import '../App.css';

export default class Signup1 extends React.Component
{
   constructor(props) {
      super(props);

      this.state = {
          first: '',
          last: '',

      }
   }

   render() {
      return (
         <div>
            <h1> Signup1 </h1>
         </div>
      );
   }
}