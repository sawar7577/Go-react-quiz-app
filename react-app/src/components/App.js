import React, { Component } from 'react';
// import DeletePerson from './DeletePerson';
// import ViewPeople from './ViewPeople';
// import EditPerson from './EditPerson';
// import NewPerson from './NewPerson';
// import Home from './Home';
import signup from './signup';
import login from './login';
import createquiz from './createquiz'



import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor () {
    super();
    this.state = {
      loggedIn : false,
    };
  };
  window.onbeforeunload = (e) => {
    console.log(e);
    return 'Stop this event';
  };
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  {/* <li><Link to={'/'}>Home</Link></li> */}
                  {/* <li><Link to={'/NewPerson'}>Create Person</Link></li>
                  <li><Link to={'/EditPerson'}>Edit Person</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li> */}
                  <li><Link to={'/signup'}>Sign Up</Link></li>
                  <li><Link to={'/login'}>Login</Link></li>
                  <li><Link to={'/createquiz'}>Create Quiz</Link></li>


                </ul>
              </div>
            </nav>
            <Switch>
                 {/* <Route exact path='/' component={Home} /> */}
                 {/* <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} /> */}
                <Route exact path='/signup' component={signup}/>
                <Route exact path='/login' component={login}/>
                <Route exact path='/createquiz' component={createquiz}/>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
