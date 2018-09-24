import React, { Component } from 'react';
import './viewquiz.css';
import PropTypes from 'prop-types';

class viewquiz extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  };

    componentDidMount() {
    const request = new Request('http://localhost:8080/private/quizzes/');
    fetch(request, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
    static contextTypes = {
      router: PropTypes.object,
    } 
    
  
  render() {
    let y = this.context;
    function EditRow(id) {
      // event.preventDefault();
      console.log(id)
      console.log('/editquiz/'+id)
      y.router.history.push('/quizedit/'+id);
    }
  

    function DeleteRow(id) {
      fetch('http://localhost:8080/private/delquiz/', {
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
              <th>Quiz Name</th>
              <th>Genre</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function (item, key) {
            return (
              <tr key={key}>
              
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.genre}</td>
                <td>{item.type}</td>
                <td><button className="btn btn-default" onClick={DeleteRow.bind(this, item.id)}>Delete</button></td>
                <td><button className="btn btn-default" id = {item.id} onClick={EditRow.bind(this,item.id)}>Edit</button></td>

              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default viewquiz;
