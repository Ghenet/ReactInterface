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
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
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
    return (
      <main className='page bg-white' id='petrating'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments/>
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
