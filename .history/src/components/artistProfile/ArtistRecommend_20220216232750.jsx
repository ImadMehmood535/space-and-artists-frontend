import React, { Component, Fragment } from 'react';
import ReactStars from 'react-rating-stars-component';
import Avatar from 'react-avatar';
import axios from 'axios';
import { baseUrl, headers, notificationError, notificationSuccess, validateValue } from '../../common/constants';
import { Link } from 'react-router-dom';

class ArtistRecommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showForm: false,
      userReview: this.props.userReview ? this.props.userReview : [],
      artists: this.props.profile,
      notLogin: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        rating: null,
        review: '',
      },
    };
  }

  handleState = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  ratingChanged = (newRating) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        rating: newRating,
      },
    });
  };

  handleReview = async (id) => {
    if (validateValue(this.state.form.rating) === true) {
      if (validateValue(this.state.form.review) === true) {
        let token = localStorage.getItem('token');
        let header = { ...headers.simple };
        if (token) {
          header.authorization = token;
        }
        let data = {
          rating: this.state.form.rating,
          review: this.state.form.review,
        };
        try {
          const res = await axios.post(`review/${id}`, data, {
            headers: header,
          });
          if (res.status === 200) {
            this.setState(
              {
                ...this.state,
                showForm: false,
                notLogin: false,
                form: {
                  rating: null,
                  review: '',
                },
              },
              () => {
                this.props.getUserReview(this.props.profile.id);
                notificationSuccess('Review', 'Thanks for your review!');
              }
            );
          }
        } catch (error) {
          notificationError('Review', error);
        }
      } else {
        notificationError('Review', 'Description is required!');
      }
    } else {
      notificationError('Review', 'Rating is required!');
    }
  };

  render() {
    return (
      <Fragment>
        <div className='ArtistRec DBlock'>
          <div className='RecoTitle DFlex h-auto'>
            <div className='TitlePort DBlock h-auto'>
              <p>Recommendation :</p>
            </div>
            <button type='button' onClick={() => this.setState({ ...this.state, showForm: !this.state.showForm })} id='RecommendationBtn'>
              RECOMMEND
            </button>
          </div>
          {this.state.showForm ? (
            <div className='RecommendationOuterDiv DBlock RecommendationForm'>
              <div className='RecommendationDiv DFlex'>
                <form action='' className='RecTextDiv DFlex justify-content-start w-100'>
                  {/* <ReactStars count={5} value={this.state.form.rating} onChange={this.ratingChanged} isHalf={true} size={24} activeColor='#e8b239' />, */}
                  <span className='ml-2'>Overall Rating</span>
                  <h4>Write your review</h4>
                  <textarea
                    name='review'
                    value={this.state.form.review}
                    onChange={(e) => this.handleState(e)}
                    placeholder='What did you like or dislike?'
                    id='review'
                  ></textarea>
                  <button type='button' onClick={() => this.handleReview(this.props.profile.id)}>
                    Add Review
                  </button>
                </form>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='RecommendationOuterDiv DBlock'>
            {this.props.userReview &&
              this.props.userReview.map((list, i) => (
                <Fragment>
                  <div className='RecommendationDiv DFlex'>
                    <Link to={`/artist-profile/${list.userId}`} onClick={() => this.props.handleUser(list.userId)} className='RecImgDiv DBlock'>
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

export default ArtistRecommend;
