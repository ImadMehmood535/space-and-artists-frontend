import React, { Component, Fragment } from 'react';
import { baseUrl, headers, notificationError, notificationSuccess, validateValue } from '../../common/constants';
import SignUpForm from './SignUpForm';
import ThanksMessage from './ThanksMessage';
import axios from 'axios';
class SingUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStep: 'StepOne',
      isSuccess: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        dob: '',
        country: '',
        role: '',
        description: '',
        category_id: '',
        linkedin_link: '',
        whatsapp_number: '',
        youtube: '',
        website_link: '',
        profile_picture: '',
        cover_picture: '',
      },
    };
  }

  handleSteps = (value) => {
    this.setState({
      ...this.state,
      showStep: value,
    });
  };

  handleState = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleDate = (date) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        dob: date,
      },
    });
  };

  handlePhone = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        phone: value,
      },
    });
  };

  handleWhatsApp = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        whatsapp_number: value,
      },
    });
  };

  handleCountry = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        country: value,
      },
    });
  };

  handleProfileImage = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        profile_picture: value,
      },
    });
  };

  handleCoverImage = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        cover_picture: value,
      },
    });
  };

  handleSubmit = async () => {
    const val =
      validateValue(this.state.form.first_name) &&
      validateValue(this.state.form.last_name) &&
      validateValue(this.state.form.email) &&
      validateValue(this.state.form.password) &&
      validateValue(this.state.form.confirm_password) &&
      validateValue(this.state.form.phone) &&
      validateValue(this.state.form.dob) &&
      validateValue(this.state.form.role) &&
      validateValue(this.state.form.country) &&
      validateValue(this.state.form.description) &&
      validateValue(this.state.form.category_id) &&
      validateValue(this.state.form.whatsapp_number) &&
      validateValue(this.state.form.profile_picture) &&
      validateValue(this.state.form.cover_picture);
    if (val === true) {
      if (this.state.form.password === this.state.form.confirm_password) {
        let formData = new FormData();
        formData.append('first_name', this.state.form.first_name);
        formData.append('last_name', this.state.form.last_name);
        formData.append('email', this.state.form.email);
        formData.append('password', this.state.form.password);
        formData.append('phone', this.state.form.phone);
        formData.append('role', this.state.form.role);
        formData.append('dob', this.state.form.dob);
        formData.append('country', this.state.form.country);
        formData.append('description', this.state.form.description);
        formData.append('category_id', this.state.form.category_id);
        formData.append('whatsapp_number', this.state.form.whatsapp_number);
        formData.append('profile_picture', this.state.form.profile_picture[0]);
        formData.append('cover_picture', this.state.form.cover_picture[0]);
        formData.append('linkedin_link', this.state.form.linkedin_link);
        formData.append('youtube', this.state.form.youtube);
        formData.append('website_link', this.state.form.website_link);
        try {
          const res = await axios.post(`${baseUrl}sign-up`, formData, { headers: headers.image });
          if (res.status === 200) {
            notificationSuccess('Sign up', 'You are registered successfully!');
          } else {
            notificationError('Sing up', 'Something woring plese try again!');
          }
        } catch (error) {
          notificationError('Sing up', error);
        }
      } else {
        notificationError('Sing up', 'Password does not matched!');
      }
    } else {
      notificationError('Sing up', 'All fileds are reuired!');
    }
  };

  render() {
    const { showStep } = this.state;
    return (
      <Fragment>
        <div className='AccountSec DBlock'>
          <div className='container'>
            <div className='AccountOuterDiv DBlock'>
              <div className='AccountPag DBlock'>
                <ul className='AccountPagUl DFlex justify-content-center'>
                  <li className={`AccountPagLink ${showStep === 'StepOne' ? 'active' : ''}`}>
                    <span>1</span>
                  </li>
                  <li className={`AccountPagLink ${showStep === 'StepTwo' ? 'active' : ''}`}>
                    <span>2</span>
                  </li>
                  <li className={`AccountPagLink ${showStep === 'StepThree' ? 'active' : ''}`}>
                    <span>3</span>
                  </li>
                </ul>
              </div>
              <SignUpForm
                form={this.state.form}
                steps={showStep}
                setDate={this.handleDate}
                handlePhone={this.handlePhone}
                handleWhatsApp={this.handleWhatsApp}
                handleCountry={this.handleCountry}
                handleProfileImage={this.handleProfileImage}
                handleCoverImage={this.handleCoverImage}
                handleSteps={this.handleSteps}
                handleState={this.handleState}
                handleSubmit={this.handleSubmit}
              />
              {this.state.isSuccess ? <ThanksMessage /> : ''}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SingUp;
