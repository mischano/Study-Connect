import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class Home extends React.Component
{
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="getStartedBtn">
            <Button component={Link} to="/auth" color="primary">
               GET STARTED FOR FREE
            </Button>
         </div>
      );
   }
}