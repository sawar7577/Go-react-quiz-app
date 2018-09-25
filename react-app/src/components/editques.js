import React, { Component } from 'react';

class editques extends Component {
    constructor() {
        super();
        this.state = {
            data : {
                
                ques:    "", 
                quizid:  "",   
                optiona: "", 
                optionb: "",
                optionc: "", 
                optiond: "", 
                vala:    false,   
                valb:    false,   
                valc:    false,   
                vald:   false,
                id: "",   
            },
        }
        this.handleQues = this.handleQues.bind(this)        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptiona = this.handleOptiona.bind(this)
        this.handleOptionb = this.handleOptionb.bind(this)
        this.handleOptionc = this.handleOptionc.bind(this)
        this.handleOptiond = this.handleOptiond.bind(this)
    };
    componentDidMount() {
        var id = this.props.match.params.id;
        const request = new Request('http://localhost:8080/private/editques/'+id);
        fetch(request, {
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data });

              console.log(this.state.data);
            }); 
      }
    handleOptiona (event) {
        let y = { ...this.state.data, "optiona" : event.target.value};
        this.setState({data : y});
    }
    handleOptionb (event) {
        let y = { ...this.state.data, "optionb" : event.target.value};
        this.setState({data : y});
    }
    handleOptionc (event) {
        let y = { ...this.state.data, "optionc" : event.target.value};
        this.setState({data : y});
    }
    handleOptiond (event) {
        let y = { ...this.state.data, "optiond" : event.target.value};
        this.setState({data : y});
    }
    handleQues (event) {
        let y = { ...this.state.data, "ques" : event.target.value};
        this.setState({data : y});
    }
    handleSubmit (event) {
        event.preventDefault();
        fetch("http://localhost:8080/private/editq",{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state.data),
        })
         .then(response => {
             if(response.status>=200 && response.status<=400){
                 console.log("done");
             }
         })

    }
      render () {
          return (
            <div className = "formContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Question</label>
                            <input type="text" className="form-control" value={this.state.data.ques} onChange={this.handleQues} />
                        </div>
                            <label>Options</label>
                            <input type="text" className="form-control" value={this.state.data.optiona} onChange={this.handleOptiona} />
                            <input type="text" className="form-control" value={this.state.data.optionb} onChange={this.handleOptionb} />
                            <input type="text" className="form-control" value={this.state.data.optionc} onChange={this.handleOptionc} />
                            <input type="text" className="form-control" value={this.state.data.optiond} onChange={this.handleOptiond} />

                        <button type="submit" className="btn btn-default" onClick = {this.handleSubmit}>Submit</button>
                        <button type="button" className="btn btn-default" onClick = {this.returnQuiz}>Done Editing</button>
    
                    </form>
                </div>
          );
      }
}

export default editques