import React, { Component, Fragment } from 'react';
import ReactStars from 'react-rating-stars-component';
import Avatar from 'react-avatar';
import axios from 'axios';
import { baseUrl, headers } from '../../common/constants';
import { Link } from 'react-router-dom';

class UserRecommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      review: [],
    };
  }

  getUserReview = async (id) => {
    try {
      const res = await axios.get(`review/all/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          review: res.data,
        });
      }
    } catch (error) {
      // notificationError('User Review', error);
    }
  };

  componentDidMount() {
    this.getUserReview(this.props.user.id);
  }

  render() {
    return (
      <Fragment>
        <div className='ArtistRec DBlock'>
          <div className='RecoTitle DFlex h-auto'>
            <div className='TitlePort DBlock h-auto'>
              <p>Recommendation :</p>
            </div>
          </div>
          <div className='RecommendationOuterDiv DBlock'>
            {this.state.review.length > 0 &&
              this.state.review.map((list, i) => (
                <Fragment>
                  <div className='RecommendationDiv DFlex'>
                    <Link to={`/artist-profile/${list.userId}`} className='RecImgDiv DBlock'>
                      <div className='ImgDiv DBlock'>
                        {list.profilePicture ? (
                          <img src={list.profilePicture} alt='' className='' />
                        ) : (
                          <Avatar name={`${list.firstName} ${list.lastName}`} size='100%' />
                        )}
                      </div>
                      <div className='FooterDiv DBlock'>
                        <p className='mb-0'>{list.firstName}</p>
                      </div>
                    </Link>
                    <div className='RecTextDiv DFlex justify-content-start'>
                      <div className='Rating DFlex w-auto'>
                        <small></small>
                        <ReactStars count={5} value={list.rating} editing={false} disabled={true} size={24} name='disabled' activeColor='#e8b239' />
                      </div>
                      <h5>Testimonial #{i + 1} :</h5>
                      <p>{list.review}</p>
                    </div>
                  </div>

                  {/* <ul className='PaginationUl DFlex justify-content-end'>
                    <li>
                      <Link to='!#'>
                        <i className='fas fa-angle-left icon'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to='!#'>
                        <i className='fas fa-angle-right icon'></i>
                      </Link>
                    </li>
                  </ul> */}
                </Fragment>
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserRecommend;
