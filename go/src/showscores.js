import React, { Component } from 'react';
import './ViewPeople.css';

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const request = new Request('http://localhost:8080/private/getscores/');
    fetch(request,{
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quizname}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewPeople;
