import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import { baseUrl, headers, notificationSuccess, notificationError, validateValue } from '../../common/constants';
import Cpryt from './Cpryt';
import axios from 'axios';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleSubscribe = async () => {
    try {
      let val = validateValue(this.state.email);
      if (val === true) {
        let data = {
          email: this.state.email,
        };
        const res = await axios.post('subscribe', data, { headers: headers.simple });
        if (res.status === 200) {
          this.setState(
            {
              ...this.state,
              email: '',
            },
            () => {
              notificationSuccess('Subscribe', 'We will keep you posted!');
            }
          );
        }
      } else {
        notificationError('Subscribe', 'Email is required!');
      }
    } catch (error) {
      notificationError('Subscribe', error);
    }
  };

  render() {
    return (
      <Fragment>
        <footer className='FooterSec DBlock'>
          <div className='container-fluid'>
            <div className='FooterOuterDiv DBlock'>
              <div className='row flex-column-reverse flex-md-row justify-content-between'>
                <div className='col-lg-3 col-md-5'>
                  <div className='FooterDiv DBlock'>
                    <Link to='/' className='d-none d-md-block'>
                      <img src='/assets/svg/FooterLogo.svg' alt='' />
                    </Link>
                    <ul className='FooterSocial DFlex justify-content-center justify-content-md-between d-none d-sm-flex'>
                      <li>
                        <a href='https://www.linkedin.com/company/spacenartists-com/?viewAsMember=true' target='blank'>
                          <i className='fab fa-linkedin-in icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.instagram.com/spacenartists/' target='blank'>
                          <i className='fab fa-instagram icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://twitter.com/SpaceNArtists' target='blank'>
                          <i className='fab fa-twitter icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.facebook.com/Spacenartistscom-100435768621944' target='blank'>
                          <i className='fab fa-facebook-f icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='mailto:info@spacenartists.com' target='blank'>
                          <i className='fas fa-envelope icon'></i>
                        </a>
                      </li>
                      <li>
                        <ReactWhatsapp number='00971543878755' className='bg-transparent border-0'>
                          <a href='/' target='blank'>
                            <i className='fab fa-whatsapp icon'></i>
                          </a>
                        </ReactWhatsapp>
                      </li>
                    </ul>
                    <ul className='FooterSocial DFlex justify-content-center justify-content-md-between d-flex d-sm-none'>
                      <li>
                        <a href='https://www.linkedin.com/company/spacenartists-com/?viewAsMember=true' target='blank'>
                          <i className='fab fa-linkedin-in icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.instagram.com/spacenartists/' target='blank'>
                          <i className='fab fa-instagram icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://twitter.com/SpaceNArtists' target='blank'>
                          <i className='fab fa-twitter icon'></i>
                        </a>
                      </li>
                    </ul>
                    <ul className='FooterSocial DFlex justify-content-center justify-content-md-between d-flex d-sm-none'>
                      <li>
                        <a href='https://www.facebook.com/Spacenartistscom-100435768621944' target='blank'>
                          <i className='fab fa-facebook-f icon'></i>
                        </a>
                      </li>
                      <li>
                        <a href='mailto:info@spacenartists.com' target='blank'>
                          <i className='fas fa-envelope icon'></i>
                        </a>
                      </li>
                      <li>
                        <ReactWhatsapp number='+971543878755' className='bg-transparent border-0'>
                          <a href='/' target='blank'>
                            <i className='fab fa-whatsapp icon'></i>
                          </a>
                        </ReactWhatsapp>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-lg-6 col-md-7'>
                  <div className='FooterDiv DBlock'>
                    <ul className='LinkUl DFlex justify-content-center'>
                      <li>
                        <Link to='/leads'>EXPLORE</Link>
                      </li>
                      <li>
                        <Link to='/blogs' className='NoBefore'>
                          BLOGS
                        </Link>
                      </li>
                    </ul>
                    <form action='' className='form FooterForm DFlex'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={this.state.email}
                        onChange={(e) => this.setState({ ...this.state, email: e.target.value })}
                        placeholder='name@email.com'
                        required
                      />
                      <button type='button' onClick={() => this.handleSubscribe()}>
                        Subscribe
                      </button>
                    </form>
                    <ol className='LinkOl DFlex justify-content-end'>
                      <li>
                        <Link to='/faqs'>FAQS</Link>
                      </li>
                      <li>
                        <Link to='/terms-and-condition'>TERMS & CONDITIONS</Link>
                      </li>
                      <li>
                        <Link to='/privacy-policy'>PRIVACY POLICY</Link>
                      </li>
                      <li>
                        <Link to='/contact-us'>CONTACT US</Link>
                      </li>
                    </ol>
                    <div><img src="/assets/images/accepted-payments-cards.png" style={{
                          float: 'right',marginTop: '2%',marginRight: '3%', paddingBottom: '3%'
                    }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Cpryt />
      </Fragment>
    );
  }
}

export default Footer;
