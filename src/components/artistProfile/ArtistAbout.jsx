import React, { Component, Fragment } from 'react';
import ArtistVideo from './ArtistVideo';
import ArtistGallery from './ArtistGallery';

class ArtistAbout extends Component {
  render() {
    return (
      <Fragment>
        <div className='ArtistPortDiv DBlock'>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <ArtistVideo profile={this.props.profile} />
            </div>
            <div className='col-md-6 mb-3'>
              <ArtistGallery profile={this.props.profile} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ArtistAbout;
