import React, { Component } from 'react';
import PropTypes from 'prop-types';

class logout extends Component {
    constructor() {
        super();
        this.state = {
            // authentication : false,
            name : 'guest',
        };
    };
    static contextTypes = {
        router: PropTypes.object,
      }
    componentDidMount() {
        fetch('http://localhost:8080/private/logout', {
            method: 'GET',
            // headers: {
            //   'Content-Type' : 'application/json',
            // },
            credentials: 'include',
            })
              .then(response => {
                if(response.status >= 200 && response.status < 300){
                            console.log("true");
                            this.context.router.history.push('/');

                } else {
                    console.log("true")
                }
          });
    }
    render () {
        return(
            <div>logged out</div>
        );
    }
        // fetch('http://localhost:8080/logout', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type' : 'application/json',
        //     },
        //     credentials: 'include',
        //     })
        //       .then(response => {
        //         if(response.status >= 200 && response.status < 300){
        //                     console.log("true")
        //         } else {
        //             console.log("true")
        //         }
        //   });

}

export default logout 