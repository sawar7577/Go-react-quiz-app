import React, { Component } from 'react';
import signup from './signup';
import login from './login';
import createquiz from './createquiz';
import viewquiz from './viewquiz';
import ViewPeople from './viewpeople';
import quizedit from './quizedit';
import logout from './logout' 
import attemptquiz from './attemptquiz';
import playquiz from './playquiz';
import editques from './editques';
// import leaderboard from './leaderboard';
import dashboard from './dashboard';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import dashboard from './dashboard';

class App extends Component {
  constructor () {
    super();
    this.state = {
      // authentication : false,
      name : 'guest',
    };
  };
  // componentDidMount() {
  //   console.log("logged")
  //   fetch('http://localhost:8080/logged', {
  //       method: 'GET',
  //       credentials: 'include',
  //       })
  //         .then(response => {
  //           if(response.status >= 200 && response.status < 300){
  //                       this.setState({authentication: true});
  //                       console.log("--->",this.state.authentication);
  //           } else {
  //             this.setState({authentication: false});
  //             console.log("--->",this.state.authentication);

  //           }
  //     });
  //     console.log("after")
  // }
  componentDidMount(){
    fetch('http://localhost:8080/logged',{
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
            .then(data => {
                this.setState({name : data});
                console.log(this.state.name);
            });
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
                  { this.state.name=='guest' &&
                    <ul className="nav navbar-nav">
                    <li><Link to={'/signup'}>Sign Up</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                    </ul>
                  }
                  { this.state.name!='guest' &&
                    <ul className="nav navbar-nav">
                    <li><Link to={'/createquiz'}>Create Quiz</Link></li>
                    <li><Link to={'/viewquiz'}>View Quiz</Link></li>
                    <li><Link to={'/viewpeople'}>View People</Link></li>
                    <li><Link to={'/logout'}>Logout</Link></li>
                    <li><Link to={'/attemptquiz'}>Attempt Quiz</Link></li>
                    {/* <li><Link to={'/leaderboard'}>Leaderboard</Link></li> */}
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>                    
                    </ul>
                  }
              </div>
            </nav>
            <Switch>
                 
                <Route exact path='/signup' component={signup}/>
                <Route exact path='/login' component={login}/>
                <Route exact path='/createquiz' component={createquiz}/>
                <Route exact path='/viewquiz' component={viewquiz}/>
                <Route exact path='/viewpeople' component={ViewPeople}/>
                <Route exact path='/quizedit/:id' component={quizedit}/>
                <Route exact path='/playquiz/:id' component={playquiz}/>
                <Route exact path='/logout' component={logout}/>
                <Route exact path='/attemptquiz' component={attemptquiz}/>
                <Route exact path='/editques/:id' component={editques}/>                
                {/* <Route exact path='/leaderboard' component={leaderboard}/>                                 */}
                <Route exact path='/dashboard' component={dashboard}/>                                                
                
            </Switch>
          </div>
        </Router>
      // </div>
    );
  }
}

export default App;
