import React, { Component } from 'react';
import './attemptquiz.css';
import PropTypes from 'prop-types';

class attemptquiz  extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
            genre : "",
        }
        
        this.handleGChange = this.handleGChange.bind(this);
        this.showScores = this.showScores.bind(this);
    };
    static contextTypes = {
        router: PropTypes.object,
      } 
    handleGChange(event) {
        this.setState({
            genre : event.target.value
        });
      this.state.genre = event.target.value;
    }
    showScores() {
        fetch('http://localhost:8080/private/getleaderboard',{
            method: 'POST',
            body:JSON.stringify(this.state.genre),
            credentials: 'include',
        })
            .then(response => response.json())
                .then(data => this.setState({data : data}));
      }
    render() {
        let x = this.context;
        let y = this.state.genre;
        
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
                <button className="btn btn-default" onClick={this.showScores}>Show Leaderboard</button>
                <table className="table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Quiz name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.username}</td>
                      <td>{item.quizname}</td>
                      <td>{item.score}</td>
                      {/* <td><button type="button" className="btn btn-default" onClick = {DeleteRow.bind(this,item.id)}>Delete</button></td> */}
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