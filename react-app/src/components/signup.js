import React, { Component } from 'react';
// import ReactDOM, { render } from 'react-dom';
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
              header: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
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
          header: {
            'content-Type': 'application/json',
        },
          credentials : 'include',
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
            <div className = "form">
                <form onSubmit={this.handleSubmit}>
                        <input type = "text" className = "text" value={this.state.FirstName} placeholder = "Firstname" onChange={this.handleFChange}/>
                        <input type = "text" className = "text" value={this.state.LastName} placeholder = "Lastname" onChange={this.handleLChange}/>
                        <input type = "text" className = "text" value={this.state.UserName} placeholder = "Username" onChange={this.handleUChange}/>
                        <div>
                          {
                            this.state.validUsername ? "username is available" : "username is taken"
                          }
                        </div>
                        <input type = "password" className = "text w3lpass" value={this.state.Password} placeholder = "Password" onChange={this.handlePChange}/>
                    <button type="submit">Submit</button>
                    {this.state.submitted &&
          <div>
            <h5>
              New person successfully added.
            </h5>
          </div>
        }
                </form>
            </div>
        </div>
         );
    }
  }
export default signup