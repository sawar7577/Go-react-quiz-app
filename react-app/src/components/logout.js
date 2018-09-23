import React, { Component } from 'react';

class logout extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            credentials: 'include',
            })
              .then(response => {
                if(response.status >= 200 && response.status < 300){
                            console.log("true")
                } else {
                    console.log("true")
                }
          });
      }

}

export default logout 