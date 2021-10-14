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

  linkGenerator(name, where) {
    return (
      <li>
        <Link to={ `/${where}` } className="indice-item">
          { name }
        </Link>
      </li>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header hidden={ loading }>
        <div className="container-left">
          <h1><kbd>_MyTunes_</kbd></h1>
        </div>
        <ul className="container-right">
          { this.linkGenerator('Home', 'home') }
          { this.linkGenerator('Search', 'search') }
          { this.linkGenerator('Favorites', 'favorites') }
          { this.linkGenerator('My Profile', 'profile') }
        </ul>
      </header>
    );
  }
}

export default Header;
