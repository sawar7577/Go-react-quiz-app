import React, { Component } from 'react';
class playquiz extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
        }

    };
    componentDidCatch (event) {
        fetch("http://localhost:8080/private/getquiz/"+this.props.match.params.id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }
    
    render() {
        return (
            <div>
               <table className = 'table-hover'>
                <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
            </div>
        );
    }
}

export default playquiz;