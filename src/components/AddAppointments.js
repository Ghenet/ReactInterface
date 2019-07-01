import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa';

export default class AddAppointments extends Component {
    constructor(){
        super();
        this.state={
            petName:'',
            ownerName: '',
            aptDate:'',
            aptTime:'',
            aptNotes:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className={'card textcenter mt-3 ' + (this.props.formDisplay ?'':'add-appointment' )}>
                {/* adds the add-appointments class if fomDisplay is true  */}
                <div className='apt-addheading card-header bg-primary text-white' onClick={this.props.toggleForm}>
                    <FaPlus /> Add Appointment
                </div>

                <div className='card-body'>
                    <form id='aptForm' noValidate onSubmit={this.handleAdd}>
                        <div className='form-group form-row'>
                            <label className='col-md-2 col-form-label text-md-right' htmlFor='petName'>
                                Pet Name
                            </label>
                            <div className='col-md-10'>
                                <input type='text' className='form-control' name='petName' placeholder="Pet's Name" value={this.state.petName}  onChange={this.handleChange} />
                            </div>
                        </div>
{/* Owners name */}
                        <div className='form-group form-row'>
                            <label className='col-md-2 col-form-label text-md-right' htmlFor='ownerName'>
                                Pet Owner
                            </label>
                            <div className='col-md-10'>
                                <input type='text' className='form-control' name='ownerName' placeholder="Owner's Name"  value={this.state.ownerName}  onChange={this.handleChange} />
                            </div>
                        </div>
{/* Apt Date */}
                        <div className='form-group form-row'>
                            <label className='col-md-2 col-form-label text-md-right' htmlFor='aptDate'>
                                Apt Date
                            </label>
                            <div className='col-md-4'>
                                <input type='date' className='form-control' name='aptDate' placeholder="aptDate"  value={this.state.aptDate}  onChange={this.handleChange} />
                            </div>
                        </div>
{/* Apt Time */}
                        <div className='form-group form-row'>
                            <label className='col-md-2 col-form-label text-md-right' htmlFor='aptTime'>
                               Time
                            </label>
                            <div className='col-md-4'>
                                <input type='time' className='form-control' name='aptTime' id='aptTime'  value={this.state.aptTime}  onChange={this.handleChange} />
                            </div>
                        </div>
{/* //Apt Notes */}
                        <div className='form-group form-row'>
                            <label className='col-md-2 col-form-label text-md-right' htmlFor='ownerName'>
                                Apt. Notes
                            </label>
                            <div className='col-md-10'>
                                <textarea className='form-control' rows='4' cols='50' name='aptNotes' placeholder='Appointment Notes' value={this.state.aptNotes}  onChange={this.handleChange} />
                            </div>
                        </div>
{/* Submit button */}
                        <div className='form-group form-row mb-0'>
                            <div className='offset-md-2 col-md-10'>
                                <button type='submit' className='btn btn-primary d-block ml-auto'>Add Appointment</button>
                            </div>
                        </div>
                    </form>

                </div>
            


            </div>
        )
    }
}
