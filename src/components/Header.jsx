import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components:
import { getUser } from '../services/userData';
import '../css/Header.css'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.userFunc();
  }

  userFunc = async () => {
    const { name } = await getUser();
    this.setState({
      name: name,
      loading: false,
    });
  }

  linkGenerator(name, id) {
    return (
      <li>
        <Link to={ `/${id}` } className="indice">
          { name }
        </Link>
      </li>
    );
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header hidden={ loading }>
        <h2><kbd>_MyTunes_</kbd></h2>
        <div className="container-right">
          <p>{ `Welcome ${name}.` }</p>
          <ul className="indice-container">
            { this.linkGenerator('Pesquisa', 'search') }
            { this.linkGenerator('Favoritos', 'favorites') }
            { this.linkGenerator('Perfil', 'profile') }
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
