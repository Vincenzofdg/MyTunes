import React, { Component } from 'react';
import Header from '../components/Header';

// Components:
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumList from '../components/AlbumList';

// CSS:
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import '../css/Search.css'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searched: '',
      albums: [],
      visible: false,
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
    const { search } = this.state;
    this.setState({

      loading: true,
      searched: search,
    });
    const result = await searchAlbumsAPI(search)
    this.setState({
      search: '',
      visible: true,
      loading: false,
      albums: result,
    });
  }

  albumsGeneration(albums, searched) {
    const { loading } = this.state;
    return (
      <div>
        <h2 className="text-center">{ `${albums.length} albums from ${searched}` }</h2>
        <div hidden={ loading } className="album-list">
          {albums.length > 0
            ? albums.map((a) => <AlbumList key={ a.collectionId } album={ a } />)
            : <p>Nenhum álbum foi encontrado</p> }
        </div>
      </div>
    );
  }

  render() {
    const {
      search,
      searched,
      albums,
      visible,
      loading } = this.state;
    const CHAR = 3;
    return (
      <div>
        <Header />
        <form className="container-search">
          <div>
            <InputGroup>
              <Input
                type="search"
                name="search"
                value={ search }
                placeholder="band"
                onChange={ this.handleChange }
              />
              <InputGroupAddon addonType="append">
                <Button
                  color="danger"
                  type="submit"
                  disabled={ search.length < CHAR }
                  onClick={ this.handleClick }
                >
                  search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </form>
        { visible && this.albumsGeneration(albums, searched) }
        { loading && <p className="c-loader fixed" /> }
      </div>
    );
  }
}

export default Search;
