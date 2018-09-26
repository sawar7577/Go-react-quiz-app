import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './signup.css';

class login extends Component {
    constructor() {
        super();
        this.state = {
                formData: {
                    UserName: "",
                    Password: "",
                },
                authentication: false,
            }
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        };
        static contextTypes = {
            router: PropTypes.object,
          } 
        handleSubmit (event) {
              event.preventDefault();
                fetch('http://localhost:8080/person/authenticate', {
                      method: 'POST',
                      header: {
                        'Content-Type': 'application/json',
                      },
                      credentials: 'include',
                      body: JSON.stringify(this.state.formData),
                    })
                  .then(response => {
                    if(response.status >= 200 && response.status < 300){
                        console.log("true")
                        this.setState({authentication: true});
                        this.context.router.history.push('/viewquiz');
                        window.location.reload();
                    }
                  });
          }
    
          handleUChange(event) {
            this.state.formData.UserName = event.target.value;
          }
          handlePChange(event) {
            this.state.formData.Password = event.target.value;
          }
    render() {
        return (
            <div className = "login" >
            <div className = "form">
                <form onSubmit={this.handleSubmit}>
                        <input type = "text" className = "text" value={this.state.UserName} placeholder = "Username" onChange={this.handleUChange}/>
                        <input type = "password" className = "text w3lpass" value={this.state.Password} placeholder = "Password" onChange={this.handlePChange}/>
                    <button type="submit">Submit</button>
                    { !this.state.authentication &&
                    <div>
                        <h5>
                        Invalid username/password
                        </h5>
                    </div>
                    }
                </form>
            </div>
        </div>

        );
    }
}

export default login