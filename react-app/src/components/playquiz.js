import React, { Component } from 'react';
// import './viewquiz.css';
import PropTypes from 'prop-types';

class playquiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      index: 0,
      // formData : { 
        selecta: false,
        selectb: false,
        selectc: false,
        selectd: false,
    // },
      score : 0,
    }
    this.handleVChange = this.handleVChange.bind(this);
    this.CheckQuiz = this.CheckQuiz.bind(this);
  };
  static contextTypes = {
    router: PropTypes.object,
  } 
    componentDidMount() {
    const request = new Request('http://localhost:8080/private/getquiz/'+this.props.match.params.id);
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
  handleVChange (event) {
    if( event.target.value == "a" ){
      this.state.selecta = !this.state.selecta;
      console.log(this.state.selecta);
    } else if( event.target.value == "b" ){
      this.state.selectb = !this.state.selectb; 
    } else if( event.target.value == "c" ){
      this.state.selectc = !this.state.selectc; 
    } else if( event.target.value == "d" ){
      this.state.selectd = !this.state.selectd; 
    }
  }
  CheckQuiz (event) {
    event.preventDefault();
    let x = this.state.data[this.state.index];

    if(this.state.selecta == x.vala){
      if(this.state.selectb == x.valb){
        if(this.state.selectc == x.valc){
          if(this.state.selectd == x.vald){
            this.setState({score:this.state.score + 1}); 
            console.log(this.state.score);

          }
        }
      }
    }
      this.setState({index:this.state.index + 1});    
  }  
  
  render() {
    let x = this.state.data[this.state.index];
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>
        {this.state.data.length && this.state.data.length>this.state.index ?
         <div>
              <h3>{x.ques}</h3>
              <table>
                <tbody>
                <tr>
                  <td>
                    {x.optiona}
                    <input type = "checkbox" className = "optradio" value="a"  onChange={this.handleVChange}/>
                  </td>
                  <td>
                    {x.optionb}
                    <input type = "checkbox" className = "optradio" value="b"  onChange={this.handleVChange}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    {x.optionc}
                    <input type = "checkbox" className = "optradio" value="c"  onChange={this.handleVChange}/>
                  </td>
                  <td>
                    {x.optiond}
                    <input type = "checkbox" className = "optradio" value="d"  onChange={this.handleVChange}/>
                  </td>
                </tr>
                </tbody>
              </table>
              <button className="btn btn-default" onClick={this.CheckQuiz}>NEXT</button>
            </div>:
            <div>
              <h3>
                  score: {this.state.score}
              </h3>
            </div>
        }
      </div>
    );
  }
}

export default playquiz;
