import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup2 from './components/signup/Signup2';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth";

function App() {
  return (
  <Router>
    <div className="App">
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup2" exact component={Signup2}/>
          <Route path="/groups" exact component={Groups}/>
          <Route path="/messages" exact component={Messages}/>
          <Route path="/profile" exact component={Profile}/>
        </Switch>
    </div>
  </Router>

  );
}

export default App;
