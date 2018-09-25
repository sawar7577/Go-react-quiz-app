import React, { Component } from 'react';
class leaderboard extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
        }
    }
    // componentDidMount() {
        // fetch('http://localhost:8080/private/getscores',{
            // method: 'GET',
            // credentials: 'include',
            // headers: {
                // 'Content-Type' : 'application/json'
            // }
        // })
        // .then(response => response.json())
            // .then(data => this.setState({ data: data }));
    // }
    render () {
        return(
            <div>
                <h3>LEADERBOARD</h3>
                
            </div>
        );
    }
}
export default leaderboard;