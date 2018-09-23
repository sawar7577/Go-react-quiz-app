// import React, { Component } from 'react';
// class editquiz extends Component {
//     constructor() {
//         super();
//         this.state = {
//             data: [],
//             formData: {
//                 Ques: "",
//                 Quizid: "",
//                 Optiona: "",
//                 Optionb: "",
//                 Optionc: "",
//                 Optiond: "",
//                 Vala: false,
//                 Valb: false,
//                 Valc: false,
//                 Vald: false,
                
//             },
//         };
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleQues = this.handleQues.bind(this)
//         this.handleOptiona = this.handleOptiona.bind(this)
//         this.handleOptionb = this.handleOptionb.bind(this)
//         this.handleOptionc = this.handleOptionc.bind(this)
//         this.handleOptiond = this.handleOptiond.bind(this)


//     }
//     componentDidMount() {
//         this.Quizid = this.props.match.params.id;
//         console.log(this.Quizid)
//         const request = new Request('http://localhost:8080/private/viewques/');
//         fetch(request, {
//           method: 'POST',
//           header: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({'id': this.Quizid})
//         })
//           .then(response => response.json())
//           .then(data => this.setState({ data: data }));
//       }
//     handleQues (event) {
//         this.state.formData.Ques = event.target.value;
//         console.log("handler")
//     }
//     handleOptiona (event) {
//         this.state.formData.Optiona = event.target.value;
//     }
//     handleOptionb (event) {
//         this.state.formData.Optionb = event.target.value;
//     }
//     handleOptionc (event) {
//         this.state.formData.Optionc = event.target.value;
//     }
//     handleOptiond (event) {
//         this.state.formData.Optiond = event.target.value;
//         console.log("func "+this.state.formData.Optiond)    
//     }
//     handleSubmit (event) {
//         console.log(this.state.formData);
//         event.preventDefault();
//         fetch('http://localhost:8080/private/ques', {
//               method: 'POST',
//               credentials: 'include',
//               header: {
//                 'Content-Type': 'application/json',
//                 // 'access-control-allow-origin': 'http://localhost:3000',
//             },
//               body: JSON.stringify(this.state.formData),
//             })
//             // .then(window.location.reload());
          
//           .then(response => {
//             //   console.log("kjsdnkjandff");
//             //   window.location.reload();
//         //   });
//             if(response.status >= 300 && response.status < 4000) {
//               console.log("aaya")
//                 this.setState({submitted: true});
//             }
//           });

//   }
//         render() {
//             function DeleteQues(id) {
//                 fetch('http://localhost:8080/private/delques/', {
//                     method: 'POST',
//                     header: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                     body: JSON.stringify({'questionID': id }),
//                 })
//                     .then(response => {
//                         if (response.status >= 200 && response.status < 300) {
//                             window.location.reload();
//                         }
//                     });
//             }
//             return (
//                 <div>
//                     <table>
//                     <tbody>{this.state.data.map(function(item, key) {
//                    return (
//                       <tr key = {key}>
//                         <td>{item.ques}</td>
//                         <td>{item.optiona}</td>
//                         <td>{item.optionb}</td>
//                         <td>{item.optionc}</td>
//                         <td>{item.optiond}</td>
//                       </tr>
//                     )
//                     })}
//                     </tbody>
//                     </table>
//                     <form onSubmit={this.handleSubmit}>
//                         <div className="form-group">
//                             <label>Question</label>
//                             <input type="text" className="form-control" value={this.state.Ques} onChange={this.handleQues} />
//                         </div>
//                         <div className="form-group">
//                             <label>Options</label>
//                             <input type="text" className="form-control" value={this.state.Optiona} onChange={this.handleOptiona} />
//                             <input type="text" className="form-control" value={this.state.Optionb} onChange={this.handleOptionb} />
//                             <input type="text" className="form-control" value={this.state.Optionc} onChange={this.handleOptionc} />
//                             <input type="text" className="form-control" value={this.state.Optiond} onChange={this.handleOptiond} />

//                         </div>
//                         <button type="submit" className="btn btn-default">Submit</button>
//                     </form>
//                 </div>
//             );
//         }
//     }

//     export default editquiz;