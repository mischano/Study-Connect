import React from 'react';
import './App.css';
import nav from './components/nav';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups';
import Messages from './components/Messages';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className="App">
      <nav />

      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/groups" exact component={Groups} />
      <Route path="/messages" exact component={Messages} />
      <Route path="/profile" exact component={Profile} />
      </Switch> 
    </div>
    </Router>
  );
}

const Home = () => (
  <div>
<h1> Home Page </h1>
    </div>

);

export default App;
