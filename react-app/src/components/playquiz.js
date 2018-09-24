import React, { Component } from 'react';
class playquiz extends Component {
    constructor() {
        super();
        this.state = {
            // data : [{
            //     "Ques" : "fdsfsd",
            //     "Optiona" : "fasdf",
            //     "Optionb" : "fasdf",
            //     "Optionc" : "fasdf",
            //     "Optiond" : "fasdf"
            // },
            // {
            //     "Ques" : "fdfdasd",
            //     "Optiona" : "ffsdff",
            //     "Optionb" : "ffdasfsd",
            //     "Optionc" : "ffsdafsdff",
            //     "Optiond" : "fdsfasdfsdaf"
            // }],
            data : [],
            index : 0
        }

    };
    componentDidCatch (event) {
        console.log("http://localhost:8080/private/getquiz/"+this.props.match.params.id);
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
    onClickedHandler = () => {
        let y = this.state.index;
        this.setState({index : y+1});
    }

    render() {
        let y = this.state.data[this.state.index];
        console.log(y);
        return (
            <div>
                { this.state.data.length &&
                <div>
                <h1>{y.Ques}</h1>
                <ul>
                    <li>A : {y.Optiona}</li>
                    <li>B : {y.Optionb}</li>
                    <li>C : {y.Optionc}</li>
                    <li>D : {y.Optiond}</li>
                </ul>
                <button onClick={this.onClickedHandler} >Next</button>
                </div>
                }
               {/* <table className = 'table-hover'>
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
          </tbody> */}
       {/* </table> */}
            </div>
        );
    }
}

export default playquiz;