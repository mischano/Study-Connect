import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup1 from './components/signup/Signup1';
import Signup2 from './components/signup/Signup2';
import Signup3 from './components/signup/Signup3';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups';
import Messages from './components/Messages';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth";

function App() {
  return (
        <Router>
          <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Dashboard}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup1" exact component={Signup1}/>
              <Route path="/signup2" exact component={Signup2}/>
              <Route path="/signup3" exact component={Signup3}/>
              <Route path="/groups" exact component={Groups}/>
              <Route path="/messages" exact component={Messages}/>
              <Route path="/profile" exact component={Profile}/>
            </Switch>
          </div>
        </Router>
  );
}

export default App;
