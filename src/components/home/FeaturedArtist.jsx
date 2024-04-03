import React, { Component, Fragment } from 'react';
import {
  baseUrl,
  headers,
  notificationError,
  shuffleLeads,
} from '../../common/constants';
import FeaturedArtistCarousel from './FeaturedArtistCarousel';
import axios from 'axios';
import { splitArray } from './../../common/constants';

class FeaturedArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists1: [],
      artists2: [],
      artists3: [],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
        1367: {
          items: 5,
        },
      },
    };
  }

  getArtist = async () => {
    try {
      const res = await axios.get(`users-all`, { headers: headers.simple });
      if (res.status === 200) {
        const filteredUsers = res.data.filter((user) => !!user.featured);
        let shuffleArt = shuffleLeads(filteredUsers);
        let newArr = splitArray(shuffleArt, 3);
        let data1 = newArr[0];
        let data2 = newArr[1];
        let data3 = newArr[2];
        this.setState({
          ...this.state,
          artists1: data1,
          artists2: data2,
          artists3: data3,
        });
      }
    } catch (error) {
      notificationError('Artists', 'Something went wrong. Please try again!');
    }
  };

  componentDidMount() {
    this.getArtist();
  }

  render() {
    return (
      <Fragment>
        <div className='FeatureArtSec DBlock'>
          <div className='container-fluid'>
            <div className='FeatureArtDiv DBlock'>
              <div className='Title TitleStyle DBlock h-auto'>
                <h2>Featured Artists</h2>
              </div>
              <div className='FloatCarousel DBlock'>
                {this.state.artists1.length > 0 ? (
                  <Fragment>
                    <FeaturedArtistCarousel
                      artists={this.state.artists1}
                      responsive={this.state.responsive}
                    />
                  </Fragment>
                ) : (
                  ''
                )}
                {this.state.artists2.length > 0 ? (
                  <Fragment>
                    <FeaturedArtistCarousel
                      artists={this.state.artists2}
                      responsive={this.state.responsive}
                    />
                  </Fragment>
                ) : (
                  ''
                )}
                {this.state.artists3.length > 0 ? (
                  <Fragment>
                    <FeaturedArtistCarousel
                      artists={this.state.artists3}
                      responsive={this.state.responsive}
                    />
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FeaturedArtist;
