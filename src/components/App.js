import React ,{Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import {without} from 'lodash';
class App extends Component {
  constructor() {
    super();
    this.state={
      myAppointments :[],
      formDisplay: true,
      orderBy: 'ownerName',
      orderDir: 'asc',
      lastIndex: 0
    };
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
//toggle method for the add appointment form display
  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
//handles the add appontment /submit method
 addAppointment(apt) {
  let tempApts = this.state.myAppointments;
  apt.aptId = this.state.lastIndex; //adds an id because we don't have an id field
  tempApts.unshift(apt);
  this.setState({
    myAppointments: tempApts,
    lastIndex: this.state.lastIndex + 1
  });
 } 

//without is a lodash method w/c returns with out the specified element
  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments:tempApts
    })
  }

  componentDidMount(){
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState(
            {lastIndex: this.state.lastIndex + 1}
          );
          return item;
      })
        this.setState({
          myAppointments: apts
        });
      });
  }
  render(){
    let order;
    let filterdApts = this.state.myAppointments;
    if(this.state.orderDir === 'asc') {
      order = 1;
    }else{
      order = -1;
    }

    filterdApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase())
        {
          return -1 * order;
        }else {
          return 1 * order;
        }
    })
    return (
      <main className='page bg-white' id='petrating'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}  addAppointment={this.addAppointment}/>
                <SearchAppointments />
                <ListAppointments appointments={filterdApts} deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
