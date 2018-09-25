import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

        // onNavigationHome () {
            // history.push("/");
        // }
    render() {
        return (
            <div className = "login">
                <div className = "formContainer">
                    <form onSubmit = {this.handleSubmit}>
                        <div className = "form-group">
                            <label>UserName</label>
                            <input type = "text" className = "form-control" value = {this.state.UserName} onChange = {this.handleUChange}/>
                        </div>
                        <div className = "form-group">
                            <label>Password</label>
                            <input type = "text" className = "form-control" value = {this.state.Password} onChange = {this.handlePChange}/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
                {this.state.authentication &&
                    <div>
                        <h2>
                        User verified.
                        </h2>
                        This has been printed using conditional rendering.
                    </div>
                    }
            </div>
        );
    }
}

export default login