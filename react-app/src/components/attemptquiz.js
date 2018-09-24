import React, { Component } from 'react';
import './attemptquiz.css';
import PropTypes from 'prop-types';

class attemptquiz  extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
            genre : ""
        }
        
        this.handleGChange = this.handleGChange.bind(this);
    };
    static contextTypes = {
        router: PropTypes.object,
      } 
    handleGChange(event) {
        this.setState({
            genre : event.target.value
        });
      this.state.genre = event.target.value;
        fetch("http://localhost:8080/private/quizzes/",{
            method: 'GET',
            credentials: 'include',
            header: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }
    
    render() {
        let x = this.context;
        let y = this.state.genre;
        function AttemptQuiz(id) {
            x.router.history.push('/playquiz/'+id);
          }
        return (
        <div>
            <div className = "form-group">
                <p>
                    <label>Genre</label>
                </p>
                <label>
                    <input type = "radio" className = "optradio" value="anime" checked = {this.state.genre === "anime"} onChange={this.handleGChange}/>
                    Anime
                </label>
                <label>
                    <input type = "radio" className = "optradio" value="marvel" checked = {this.state.genre === "marvel"} onChange={this.handleGChange}/>
                    Marvel
            </label>
            </div>
            <table className="table-hover">
            <tbody>{this.state.data.map(function (item, key) {
            return (
              <tr key={key}>
                { item.genre == y &&
                <td>{item.id}</td> }
                { item.genre == y &&
                <td>{item.name}</td>}
                { item.genre == y &&
                <td>{item.genre}</td>}
                { item.genre == y &&
                <td>{item.type}</td>}
                { item.genre == y &&
                <td><button className="btn btn-default" id = {item.id} onClick={AttemptQuiz.bind(this,item.id)}>Attempt</button></td>}

              </tr>
            )
          })}
          </tbody>
          </table>
        </div>
        );
    }
}

export default attemptquiz;