import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class createquiz extends Component {
    constructor() {
        super();
        this.state = {
            formData : {
                Name : "",
                Genre : "",
                Type : "",
            },
            submitted : false,
        }
        this.handleNChange = this.handleNChange.bind(this);
        this.handleGChange = this.handleGChange.bind(this);
        this.handleTChange = this.handleTChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit (event) {
            console.log(this.state.formData);
          event.preventDefault();
            fetch('http://localhost:8080/private/quiz', {
                  method: 'POST',
                  credentials: 'include',
                  body: JSON.stringify(this.state.formData),
                })
              .then(response => {
                if(response.status >= 200 && response.status < 300)
                  this.setState({submitted: true});
              });
      }
    handleNChange(event) {
      this.state.formData.Name = event.target.value;
    }
    handleGChange(event) {
        this.setState({
            Genre : event.target.value
        });
      this.state.formData.Genre = event.target.value;

    }
    handleTChange(event) {
        this.setState({
            Type : event.target.value
        });
      this.state.formData.Type = event.target.value;

    }
    render () {
        return (
            <div className = "signup" >
                <div className = "formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className = "form-group">
                            <ul>
                                <li>
                                    <label>
                                        <input type = "radio" className = "form-control" value="multipleCorrect" checked = {this.state.Type === "multipleCorrect"} onChange={this.handleTChange}/>
                                        Multiple Correct
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type = "radio" className = "form-control" value="singleCorrect" checked = {this.state.Type === "singleCorrect"} onChange={this.handleTChange}/>
                                        Single Correct
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className = "form-group">
                            <ul>
                                <li>
                                    <label>
                                        <input type = "radio" className = "form-control" value="anime" checked = {this.state.Genre === "anime"} onChange={this.handleGChange}/>
                                        Anime
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type = "radio" className = "form-control" value="marvel" checked = {this.state.Genre === "marvel"} onChange={this.handleGChange}/>
                                        Marvel
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className = "form-group">
                            <label>Quiz Name</label>
                            <input type = "text" className = "form-control" value={this.state.Name} onChange={this.handleNChange}/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
    
                    </form>
                </div>
                {this.state.submitted &&
              <div>
                <h2>
                  New quiz successfully added.
                </h2>
                 This has been printed using conditional rendering.
              </div>
            }
            </div>
             );
    };
}

export default createquiz