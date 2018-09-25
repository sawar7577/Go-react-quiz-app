import React, { Component } from 'react';

class dashboard extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            data : [],
        }
        
    }
    componentDidMount(){
        fetch('http://localhost:8080/logged',{
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
                .then(data => {
                    this.setState({name : data});
                    console.log(this.state.name);
                    fetch('http://localhost:8080/private/getscores/'+this.state.name,{
                        method: 'GET',
                        credentials: 'include',
                    })
                    .then(response => response.json())
                        .then(data => {
                            this.setState({data:data});
                        })
                });
        }

    render () {
        return (
            <div>
                <h3>welcome {this.state.name}</h3>
                <table className="table-hover">
                    <thead>
                        <tr>
                        <th>Quiz Name</th>
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

export default dashboard;