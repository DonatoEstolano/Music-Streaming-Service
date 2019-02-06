import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import FadeIn from 'react-fade-in';
import AccountData from "./Accounts.json"

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
                    disabled={!this.validateForm()}
                    type="submit"
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