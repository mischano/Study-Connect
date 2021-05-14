import React from 'react';
import './App.css';
import Signup2 from './components/signup/Signup2';
import Home from './components/Home';
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
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/signup2" exact component={Signup2}/>
    <Route path="/auth" exact component={Auth}/>
    <div className="App">
      <Navbar/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/groups" exact component={Groups}/>
          <Route path="/messages" exact component={Messages}/>
          <Route path="/profile" exact component={Profile}/>
    </div>
    </Switch>
  </Router>

  );
}

export default App;
