import React, { Component, Fragment } from 'react';
import ArtistInfo from './ArtistInfo';
import ArtistAbout from './ArtistAbout';
import ArtistRecommend from './ArtistRecommend';

class ProfileMain extends Component {
  render() {
    return (
      <Fragment>
        <div className='ArtistProSec DBlock'>
          <div className='container'>
            <div className='ArtistProArea DBlock'>
              <ArtistInfo profile={this.props.profile} />
              <ArtistAbout profile={this.props.profile} />
              <ArtistRecommend
                handleUser={this.props.handleUser}
                getUserReview={this.props.getUserReview}
                userReview={this.props.userReview}
                profile={this.props.profile}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProfileMain;
