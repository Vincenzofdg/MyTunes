import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Components:
import { createUser } from '../services/userData';

// CSS:
import { Button, Input } from 'reactstrap';
import '../css/Login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      nextPag: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { login } = this.state;
    this.setState({ loading: true });
    await createUser({ name: login }); // Create de user data in LocalStorage
    this.setState({ nextPag: true });
  }

  render() {
    const { login, loading, nextPag } = this.state;
    const CHAR = 3;
    return (
      <div className="page-container">
        <div className="login-container">
          <h1 className="title">
            <kbd>_MyTunes_</kbd>
            <samp> Music Trial</samp>
          </h1>
          <section className="login">
            <Input
              id="input-login"
              name="login"
              hidden={ loading }
              value={ login }
              placeholder="Insert your user name"
              onChange={ this.handleChange }
            />
            <Button
              hidden={ loading }
              onClick={ this.handleClick }
              disabled={ login.length < CHAR }
              color="primary"
            >
              Enter
            </Button>
            {/* Conditionals for further renderization*/}
            { loading && <span className="c-loader" /> }
            {/* { nextPag && <Redirect to="/home" /> } */}
            { nextPag && <Redirect to="/search" /> }
          </section>
        </div>
      </div>
    );
  }
}

export default Login;
