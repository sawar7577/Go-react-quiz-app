import React, { Component } from 'react';
// import DeletePerson from './DeletePerson';
// import ViewPeople from './ViewPeople';
// import EditPerson from './EditPerson';
// import NewPerson from './NewPerson';
// import Home from './Home';
import signup from './signup';
import login from './login';
import createquiz from './createquiz';
import viewquiz from './viewquiz';
import ViewPeople from './viewpeople';
import quizedit from './quizedit';
import logout from './logout' 



import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor () {
    super();
    this.state = {
      authentication : false,
    };
  };
  componentDidMount() {
    console.log("logged")
    // fetch('http://localhost:8080/logged', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type' : 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(this.state.formData),
    //     })
    //       .then(response => {
    //         if(response.status >= 200 && response.status < 300){
    //                     console.log("true")
    //                     this.setState({authentication: true});
    //         } else {
    //           this.setState({authentication: false});
    //         }
    //   });
      console.log("after")
  }
  render() {
    return (
      // <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                    <ul className="nav navbar-nav">
                    <li><Link to={'/signup'}>Sign Up</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>

                    <li><Link to={'/createquiz'}>Create Quiz</Link></li>
                    <li><Link to={'/viewquiz'}>View Quiz</Link></li>
                    <li><Link to={'/viewpeople'}>View People</Link></li>
                    <li><Link to={'/logout'}>Logout</Link></li>
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    </ul>
              </div>
            </nav>
            <Switch>
                 
                <Route exact path='/signup' component={signup}/>
                <Route exact path='/login' component={login}/>
                <Route exact path='/createquiz' component={createquiz}/>
                <Route exact path='/viewquiz' component={viewquiz}/>
                <Route exact path='/viewpeople' component={ViewPeople}/>
                <Route exact path='/quizedit/:id' component={quizedit}/>
                <Route exact path='/logout' component={logout}/>
                <Route exact path='/dashboard' component={dashboard}/>
                
            </Switch>
          </div>
        </Router>
      // </div>
    );
  }
}

export default App;
