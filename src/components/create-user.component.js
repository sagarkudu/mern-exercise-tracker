import React, { Component } from 'react';
import axios from 'axios'; //connecting backend to frontend

export default class CreateUsers extends Component {

        constructor(props) {
        super(props); //in js classes,you need to always call super() when defining the constructor of subclass.

        //note that this.state may give you undefined, so need to bind this.state with class.
        //using .bind it bind to the methods belows
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting initial state of component by assigning object using this.state
        this.state = {
            //getting property from dB.
            username: '',
        }
    }

     //whenever you update the state it will automatically update the state, so using methods here.
    onChangeUsername(e) {
        //when username is changed, set the state. (not, this.state.username ="beau")
        this.setState({
            username: e.target.value //this updates username from input,here target is textbox &
        });
    }

     //after all methods, creating event for submit button, we will add handle.submit event on the form
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
    
        //keeping users on same page so that it can insert multiple users at same time 
        this.setState({
            username: ''
        });
    }

    render() {
        return (
           <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group pb-2">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control pb-2"
                            value={this.state.username}
                            onChange={this.onChangeUsername} 
                        />
                    </div>

                   <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
            
          </div>
        </form>
      </div>
        );
    }
}