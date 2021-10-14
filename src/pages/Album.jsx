import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

// CSS:
import { Spinner } from 'reactstrap';

import {
  addSong,
  // getFavoriteSongs,
  removeSong
} from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
      tracks: [],
    };
    this.getAlbumById = this.getAlbumById.bind(this);
    this.checkCapture = this.checkCapture.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    await this.getAlbumById(id);
  }

  getAlbumById = async (param) => {
    const result = await getMusics(param);
    this.setState({
      album: result[0], // Pois o primeiro elemento do array são as infos do album
      tracks: result.slice(1),
    });
  }

  checkCapture = async (marked, name) => {
    await (marked ? await addSong(name) : await removeSong(name));
  }

  render() {
    const { album, tracks, loading } = this.state;
    return (
      <div>
        <Header />
        <main className="d-flex flex-column">
          <div className="p-5 d-flex justify-content-center align-items-center">
            <img width="250px" className="rounded-circle" id="album-img" src={album.artworkUrl100} alt="Album-Img" />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">{`Artist: ${album.artistName}`}</li>
              <li className="list-group-item bg-transparent">{`Album: ${album.collectionName}`}</li>
              <li className="list-group-item bg-transparent">{`Tracks: ${album.trackCount}`}</li>
              <li className="list-group-item bg-transparent">{`Genre: ${album.primaryGenreName}`}</li>
              <li className="list-group-item bg-transparent">{`Country: ${album.country}`}</li>
            </ul>
          </div>
          <div className="tracks" hidden={loading}>
            {tracks.map((music) => (
              <MusicCard
                key={music.trackId}
                music={music} // prop o objetos musica
                callback={this.checkCapture}
              />))}
          </div>

        </main>
        {loading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
