import React ,{Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import {findIndex, without} from 'lodash';
class App extends Component {
  constructor() {
    super();
    this.state={
      myAppointments :[],
      formDisplay: true,
      orderBy: 'aptDate',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    };
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }
//toggle method for the add appointment form display
  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
 //handles change in the search bar
 searchApts(query) {
   this.setState({
    queryText: query
   });
 } 
//handles the change order of display
changeOrder(order,dir) {
  this.setState({
    orderBy: order,
    orderDir: dir
  });
}

//handles editing/updating the content
updateInfo(name, value, id ){
  let tempApts = this.state.myAppointments;
  let aptIndex = findIndex(this.state.myAppointments, {
    aptId: id
  });
  tempApts[aptIndex][name] = value;
  this.setState({
    myAppointments: tempApts
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
//filters the appointments
   filterdApts = filterdApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase())
        {
          return -1 * order;
        }else {
          return 1 * order;
        }
    })
    .filter(eachItem =>{
      return (
        eachItem['petName']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes']
        .toLowerCase()
        .includes(this.state.queryText.toLowerCase())
      );
    });
    return (
      <main className='page bg-white' id='petrating'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}  addAppointment={this.addAppointment}/>
                <SearchAppointments 
                 orderBy={this.state.orderBy} 
                 orderDir={this.state.orderDir}  
                 changeOrder={this.changeOrder} 
                 searchApts={this.searchApts} />
                <ListAppointments 
                appointments={filterdApts} 
                deleteAppointment={this.deleteAppointment}
                updateInfo={this.updateInfo} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
