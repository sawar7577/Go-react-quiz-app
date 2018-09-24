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
    const request = new Request('http://localhost:8080/private/people/');
    fetch(request,{
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    function DeleteRow(id) {
      fetch('http://localhost:8080/private/delperson/', {
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
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td><button type="button" className="btn btn-default" onClick = {DeleteRow.bind(this,item.id)}>Delete</button></td>
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
