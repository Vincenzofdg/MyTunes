import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// CSS:
import {
  Card, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import '../css/AlbumList.css'

class AlbumList extends Component {
  render() {
    const {
      collectionId: id,
      collectionName: name,
      releaseDate: release,
      artworkUrl100: image } = this.props.album;
    const year = release.split('T');
    return (
      <Card className="album-card">
        <CardBody className="text-center">
          <CardTitle tag="p" className="fs-6 fw-bold">{name.slice(0, 17)}</CardTitle>
          <CardSubtitle tag="p" className="mb-2 fw-bold text-muted">{year[0].replace(/-/g, '/')}</CardSubtitle>
        </CardBody>
        <img height="55%" src={image} alt="Album Cover" />
        <CardBody className="d-flex justify-content-around">
          <Link className="fw-bold link-danger" to={`album/${id}`}>Listen to the Album</Link>
        </CardBody>
      </Card>
    );
  }
}

AlbumList.defaultProps = {
  album: [],
};

AlbumList.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  })),
};

export default AlbumList;
