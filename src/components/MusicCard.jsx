import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  handleChange = ({ target }) => {
    const { music, callback } = this.props;
    const { checked } = target;
    callback(checked, music);
  }

  render() {
    const { music } = this.props;
    const name = '15%';
    return (
      <div className="mx-4 d-flex align-items-center bd-highlight">
        <div style={{ width: name }} className="text-center fs-6 p-2 bd-highlight bg-dark bg-opacity-50">{music.trackName}</div>
        <audio className="p-2 flex-grow-1 bd-highlight" src={music.previewUrl} controls>
          <track kind="captions" />
        </audio>
        <div className="form-check form-switch">
          <label
            className="form-check-label"
            htmlFor={`flexSwitchCheckChecked ${music.trackNumber}`}
            >
            Favorite
          </label>
          <input
            name={ music.trackName }
            onChange={ this.handleChange }
            className="form-check-input"
            type="checkbox"
            id={`flexSwitchCheckChecked ${music.trackNumber}`}
          />
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  music: {},
  callback: undefined,
};

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any),
  callback: PropTypes.func,
};

export default MusicCard;
