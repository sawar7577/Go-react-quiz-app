import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import './signup.css';

class signup extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            FirstName: "",
            LastName: "",
            UserName: "",
            Password: "",
          },
          submitted: false,
          validUsername : false,
        }
        this.handleFChange = this.handleFChange.bind(this);
        this.handleLChange = this.handleLChange.bind(this);
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };

      handleSubmit (event) {
        if (this.state.validUsername == true ){
          event.preventDefault();
            fetch('http://localhost:8080/person', {
                  method: 'POST',
                  body: JSON.stringify(this.state.formData),
                })
              .then(response => {
                if(response.status >= 200 && response.status < 300)
                  this.setState({submitted: true});
              });
        }
      }

      handleFChange(event) {
        this.state.formData.FirstName = event.target.value;
      }
      handleLChange(event) {
        this.state.formData.LastName = event.target.value;
      }
      handleUChange(event) {
        this.state.formData.UserName = event.target.value;
        const request = new Request('http://localhost:8080/person/');
        
        fetch(request, {
          method : 'POST',
          body: JSON.stringify(this.state.formData),
        })
        .then(response => response.json())
          .then(data => this.setState({validUsername: data}));
          
      }
      handlePChange(event) {
        this.state.formData.Password = event.target.value;
      }
      
    render() {

      return (
        <div className = "signup" >
            <div className = "formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className = "form-group">
                        <label>First Name</label>
                        <input type = "text" className = "form-control" value={this.state.FirstName} onChange={this.handleFChange}/>
                    </div>
                    <div className = "form-group">
                        <label>Last Name</label>
                        <input type = "text" className = "form-control" value={this.state.LastName} onChange={this.handleLChange}/>
                    </div>
                    <div className = "form-group">
                        <label>User Name</label>
                        <input type = "text" className = "form-control" value={this.state.UserName} onChange={this.handleUChange}/>
                        <div>
                          {
                            this.state.validUsername ? "username is available" : "username is taken"
                          }
                        </div>
                    </div>
                    <div className = "form-group">
                        <label>Password</label>
                        <input type = "text" className = "form-control" value={this.state.Password} onChange={this.handlePChange}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>

                </form>
            </div>
            {this.state.submitted &&
          <div>
            <h2>
              New person successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
        </div>
         );
    }
  }

// render(<App />, document.getElementById('root'));
export default signup