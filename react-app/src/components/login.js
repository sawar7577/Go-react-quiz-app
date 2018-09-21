import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

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
        handleSubmit (event) {
              event.preventDefault();
                fetch('http://localhost:8080/person/authenticate', {
                      method: 'POST',
                      credentials: 'include',
                      body: JSON.stringify(this.state.formData),
                    })
                  .then(response => {
                    if(response.status >= 200 && response.status < 300){
                        console.log("true")
                        this.setState({authentication: true});
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