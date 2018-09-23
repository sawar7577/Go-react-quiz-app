import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import './createquiz.css';
import PropTypes from 'prop-types';

class createquiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            qid: 0,
            formData : {
                
                Ques:    "", 
                Quizid:  "",   
                Optiona: "", 
                Optionb: "",
                Optionc: "", 
                Optiond: "", 
                Vala:    false,   
                Valb:    false,   
                Valc:    false,   
                Vald:   false,   
            },
            submitted : false,
        }
        this.handleQues = this.handleQues.bind(this)        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptiona = this.handleOptiona.bind(this)
        this.handleOptionb = this.handleOptionb.bind(this)
        this.handleOptionc = this.handleOptionc.bind(this)
        this.handleOptiond = this.handleOptiond.bind(this)
        this.returnQuiz = this.returnQuiz.bind(this)


    };
    static contextTypes = {
        router: PropTypes.object,
      } 
    componentDidMount() {
        var id = this.props.match.params.id;
        console.log("id hai "+id);
        const request = new Request('http://localhost:8080/private/viewques/');
        fetch(request, {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({'id': id}),
        })
          .then(response => response.json())
          .then(data => this.setState({ data: data }));
      }
    returnQuiz (event) {
        event.preventDefault();
        this.context.router.history.push('/viewquiz');

    }
    handleSubmit (event) {
            console.log(this.state.formData);
          event.preventDefault();
            fetch('http://localhost:8080/private/ques', {
                  method: 'POST',
                  credentials: 'include',
                  header: {
                    'Content-Type': 'application/json',
                },
                  body: JSON.stringify(this.state.formData),
                })
              .then(response => {
                if(response.status >= 200 && response.status < 300){
                  this.setState({submitted: true});
                    window.location.reload();
                }
              });
      }
    
    handleQues (event) {
        this.state.formData.Ques = event.target.value;
        this.state.formData.Quizid = this.props.match.params.id;
        console.log("handler")
    }

    handleOptiona (event) {
        this.state.formData.Optiona = event.target.value;
    }
    handleOptionb (event) {
        this.state.formData.Optionb = event.target.value;
    }
    handleOptionc (event) {
        this.state.formData.Optionc = event.target.value;
    }
    handleOptiond (event) {
        this.state.formData.Optiond = event.target.value;
        console.log("func "+this.state.formData.Optiond)    
    }
    render () {
       function deleteRow(id) {
        fetch('http://localhost:8080/private/delques', {
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 'id': id }),
          })
            .then(response => {
              if (response.status >= 200 && response.status < 300) {
                window.location.reload();
              }
            });
       } 
        return (
            <div className = "signup" >
                    <table>
                    <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.ques}</td>
                      <td>{item.optiona}</td>
                      <td>{item.optionb}</td>
                      <td>{item.optionc}</td>
                      <td>{item.optiond}</td>

                      <td><button className = "btn btn-default" id={item.id} onClick ={deleteRow.bind(this, item.id)}>Delete</button></td>
                  </tr>
                )
             })}
             </tbody>
             </table>
                <div className = "formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Question</label>
                            <input type="text" className="form-control" value={this.state.Ques} onChange={this.handleQues} />
                        </div>
                            <label>Options</label>
                            <input type="text" className="form-control" value={this.state.Optiona} onChange={this.handleOptiona} />
                            <input type="text" className="form-control" value={this.state.Optionb} onChange={this.handleOptionb} />
                            <input type="text" className="form-control" value={this.state.Optionc} onChange={this.handleOptionc} />
                            <input type="text" className="form-control" value={this.state.Optiond} onChange={this.handleOptiond} />

                        <button type="submit" className="btn btn-default">Submit</button>
                        <button type="button" className="btn btn-default" onClick = {this.returnQuiz}>Done Editing</button>
    
                    </form>
                </div>
            </div>
             );
    };
}

export default createquiz