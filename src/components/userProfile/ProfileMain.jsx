import React, { Component, Fragment } from 'react';
import UserInfo from './UserInfo';
import UserAbout from './UserAbout';
import UserEditModal from './UserEditModal';
import UserRecommend from './UserRecommend';

class ProfileMain extends Component {
  render() {
    return (
      <Fragment>
        <div className='ArtistProSec DBlock'>
          <div className='container'>
            <div className='ArtistProArea DBlock'>
              <UserInfo user={this.props.user} />
              <UserAbout user={this.props.user} />
              <UserRecommend user={this.props.user} />
            </div>
          </div>
        </div>
        <UserEditModal getUserByToken={this.props.getUserByToken} />
      </Fragment>
    );
  }
}

export default ProfileMain;
