import React from 'react';
import './App.css';
import Signup2 from './components/signup/Signup2';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups/Groups';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import OtherUser from './components/OtherUser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import Group from "./components/Groups/Group"

function App() {
   return (
      <Router>
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup2" exact component={Signup2} />
            <Route path="/auth" exact component={Auth} />
            <div className="App">
               <Navbar />
               <Route path="/dashboard" exact component={Dashboard} />
               <Route path="/groups" exact component={Groups} />
               <Route path="/profile" exact component={Profile} />
               <Route path="/profile/:id" exact component={OtherUser} />
               <Route path="/groups/:id" exact component={Group} />
            </div>
         </Switch>
      </Router>

   );
}

export default App;
