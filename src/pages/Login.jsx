import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Componentes:
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
    await createUser({ name: login });
    this.setState({ nextPag: true });
  }

  render() {
    const { login, loading, nextPag } = this.state;
    const CHAR = 6;
    const loadType = 'p';
    return (
      <div className="login-container">
        <h1 className="title">MyTunes</h1>
        <section className="login">
          <Input
            id="input-login"
            name="login"
            value={ login }
            onChange={ this.handleChange }
          />
          <Button
            onClick={ this.handleClick }
            disabled={ login.length < CHAR }
            color="primary"
            id="btn-enter"
          >
            Enter
          </Button>
        </section>

        {/* Condicionais de Loading e Redirecionar */}
        { loading && <Loading type={ loadType } /> }
        { nextPag && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
