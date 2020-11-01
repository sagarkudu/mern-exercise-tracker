//add exercises to the database

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props); //in js classes,you need to always call super() when defining the constructor of subclass.

        //note that this.state may give you undefined, so need to bind this.state with class.
        //using .bind it bind to the methods belows
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting initial state of component by assigning object using this.state
        this.state = {
            //getting property from dB.
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [] //array used here to get dropdown menu directly from dB
        }
    }

    //adding lifecycle method to get all username as dropdown from dB.
    //it will automatically gets called before anything displayed on the page.
    componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })    
      
     axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    }
    
    //whenever you update the state it will automatically update the state, so using methods here.
    onChangeUsername(e) {
        //when username is changed, set the state. (not, this.state.username ="beau")
        this.setState({
            username: e.target.value //this updates username from input,here target is textbox &
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    //passing (date) here and adding date library 
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    //after all methods, creating event for submit button, we will add handle.submit event on the form
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/'; //redirecting to homepage
        //connecting front end to backend
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group pb-2">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control pb-2"
                            value={this.state.username}
                            onChange={this.onChangeUsername} >
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user} > {user}
                                    </option>;
                                })    
                            }
                        </select>
                    </div>

                    <div className="form-group pb-2">
                        <label>Description: </label>
                        <input
                            type="text" 
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group pb-2">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    
                    <div className="form-group pb-3">
                        <label>Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                        </div>
                    </div>
                   <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
            
          </div>
        </form>
      </div>
    )
  }
}