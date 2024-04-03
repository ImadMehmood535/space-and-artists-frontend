import React, { Component, Fragment } from 'react';
import { baseUrl, headers, notificationError } from '../../common/constants';
import ProfileMain from './ProfileMain';
import axios from 'axios';
import Loader from './../../common/Loader';

class ArtistProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userReview: [],
      artistProfile: {},
    };
  }

  getUserReview = async (id) => {
    try {
      const res = await axios.get(`review/all/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          userReview: res.data,
        });
      }
    } catch (error) {
      // notificationError('User Review', error);
    }
  };

  getArtistsById = async (id) => {
    try {
      const res = await axios.get(`user/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        this.setState(
          {
            ...this.state,
            loading: false,
            artistProfile: res.data[0],
          },
          () => {
            this.getUserReview(res.data[0].id);
          }
        );
      }
    } catch (error) {
      notificationError('Artist', 'Something went wrong. Please try again!');
    }
  };

  handleUser = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getArtistsById(id);
  };

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let id = this.props.match.params.id;
    if (id) this.getArtistsById(id);
  }

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <Loader loader={this.state.loading} />
        ) : (
          <Fragment>
            <div className='ArtistHomeDiv DBlock'>
              <div className='ArtistHomeText DBlock'>
                <img src={this.state.artistProfile ? this.state.artistProfile.coverPicture : ''} alt='' />
              </div>
            </div>
            <ProfileMain
              handleUser={this.handleUser}
              getUserReview={this.getUserReview}
              userReview={this.state.userReview}
              profile={this.state.artistProfile}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default ArtistProfile;
