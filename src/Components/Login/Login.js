import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import FadeIn from 'react-fade-in';
//import AccountDataTest from "./Accounts.json"

export default class Login extends Component {
  constructor(props) {
    super(props);

    if(this.props.cookies.get("UserName")){ //if logged in then don't promt for login
      this.props.history.push("/");
    }

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    function getAccountData(){ //calls the server
      return Promise.all([fetch('http://localhost:5000/account_data').then(response => response.json())]) //gets the json object
    }
    getAccountData().then(([AccountData])=> { //then keyword wiats until the json data is loaded
console.log(AccountData);
      function GetUserInfo(user) {
        return AccountData.filter(
          function(AccountData) {
            return AccountData.username === user;
          }
        );
      }    

      var user = this.state.username;
      var userInfo = GetUserInfo(user)[0];

      if(userInfo["password"] === this.state.password){

        this.props.cookies.set('UserName', userInfo["username"], { path: '/' });

        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
      }
    });

  }

  newUser = event =>{
    console.log('New User');
    var obj = {username: 'use', password: '123', name:'Test User'}

    fetch('http://localhost:5000/add_user',{
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {"Content-Type": "application/json"}
    });
  }

  render() {
    return (
      <section className="login-landing">
        <div className="login-landing-inner-top">
          <div className="login-landing-inner-top-content">
            <FadeIn delay="200" transitionDuration="2000">
              <h1>Apple-Tidal Spotify Player</h1>

              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    className="login-textbox"
                  />
                  <ControlLabel className="login-headers">Username</ControlLabel>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    className="login-textbox"
                  />
                  <ControlLabel className="login-headers">Password</ControlLabel>
                </FormGroup>
                <FormGroup>
                  <Button
                      block
                      bsSize="small"
                      disabled={!this.validateForm()}
                      type="submit"
                      className="login-btn"
                    >
                      Login
                  </Button>
                  <Button
                    block
                    bsSize="small"
                    //disabled={!this.validateForm()}
                    onClick = {this.newUser}
                    //type="submit"
                    className="signup-btn"
                  >
                    Sign Up
                  </Button>
                </FormGroup>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }
}