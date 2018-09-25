import React, { Component } from 'react';

class dashboard extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            // authentication : false,
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
                });
        }

    render () {
        return (
            <div>
                <h3>welcome {this.state.name}</h3>
            </div>
        );
    }
}

export default dashboard;