import React, { Component, Fragment } from 'react';
import PhoneInput from 'react-phone-number-input';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import CropProfileImage from './CropProfileImage';
import {
  headers,
  notificationError,
  validFacebook,
  validYoutube,
  validWebsite,
  validLinkedIn,
  validateValue,
  notificationSuccess,
} from '../../../common/admin/constants';
import axios from 'axios';
import Loader from '../../../common/admin/Loader';
import DateCustomPicker from './DateCustomPicker';

export class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loader: false,
      selectedDate: null,
      category: [],
      subCategory: [],
      allCountries: [],
      allCities: [],
      form: {
        firstName: '',
        lastName: '',
        email: '',
        changePassword: '',
        phone: '',
        dateOfBirth: '',
        cityId: '',
        countryId: '',
        role: '',
        description: '',
        categoryId: '',
        linkedin: '',
        whatsapp: '',
        youtube: '',
        website: '',
        facebook: '',
        instagram: '',
        profilePicture: '',
        coverPicture: '',
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

  handleDate = (date) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        dateOfBirth: date,
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

  handleProfileImage = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        profilePicture: value,
      },
    });
  };

  handleCoverImage = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        coverPicture: value,
      },
    });
  };

  getCountries = async () => {
    try {
      const res = await axios.get('country', { headers: headers.simple });
      if (res.status === 200) {
        this.setState(
          {
            ...this.state,
            allCountries: res.data,
          },
          () => this.getCategories()
        );
      }
    } catch (error) {
      this.setState(
        {
          ...this.state,
          allCities: [],
        },
        () => notificationError('Sign up', error)
      );
    }
  };

  getCities = async (id) => {
    try {
      const res = await axios.get(`city/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          loader: false,
          allCities: res.data,
        });
      }
    } catch (error) {
      this.setState(
        {
          ...this.state,
          loader: false,
        },
        () => notificationError('Sign up', error)
      );
    }
  };

  handleCountry = (id) => {
    this.setState(
      {
        ...this.state,
        form: {
          ...this.state.form,
          loader: true,
          countryId: id,
        },
      },
      () => this.getCities(id)
    );
  };

  getCategories = async () => {
    try {
      const res = await axios.get('category/all', { headers: headers.simple });
      this.setState({
        loading: false,
        category: res.data,
      });
    } catch (error) {
      this.setState(
        {
          loading: false,
        },
        () => notificationError('Categories', error)
      );
    }
  };

  handleSubcategory = async (id) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        loader: true,
        categoryParentId: id,
      },
    });
    try {
      const res = await axios.get(`category/all/${id}`, { headers: headers.simple });
      this.setState({
        loader: false,
        subCategory: res.data,
      });
    } catch (error) {
      this.setState(
        {
          loader: false,
        },
        () => notificationError('Sub Categories', error)
      );
    }
  };

  getUserById = async (id) => {
    try {
      const res = await axios.get(`user/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          loading: false,
          form: res.data[0],
        });
      }
    } catch (error) {
      notificationError('User', error);
    }
  };

  updateUsers = async (id) => {
    this.setState({
      ...this.state,
      loader: false,
    });
    let formData = new FormData();
    formData.append('firstName', this.state.form.firstName);
    formData.append('lastName', this.state.form.lastName);
    formData.append('email', this.state.form.email);
    formData.append('phone', this.state.form.phone);
    formData.append('role', this.state.form.role);
    formData.append('dateOfBirth', this.state.form.dateOfBirth);
    formData.append('countryId', this.state.form.countryId);
    formData.append('cityId', this.state.form.cityId);
    formData.append('description', this.state.form.description);
    formData.append('categoryId', this.state.form.categoryId);
    formData.append('whatsapp', this.state.form.whatsapp);
    formData.append('youtube', this.state.form.youtube);
    if (validateValue(this.state.form.linkedin) && validLinkedIn(this.state.form.linkedin) == true)
      formData.append('linkedin', this.state.form.linkedin);
    if (validateValue(this.state.form.facebook) && validFacebook(this.state.form.facebook) == true)
      formData.append('facebook', this.state.form.facebook);
    if (validateValue(this.state.form.instagram) == true) formData.append('instagram', this.state.form.instagram);
    if (validateValue(this.state.form.website) && validWebsite(this.state.form.website) == true) formData.append('website', this.state.form.website);
    if (typeof this.state.form.profilePicture !== 'string')
      formData.append('profilePicture', typeof this.state.form.profilePicture !== 'string' ? this.state.form.profilePicture[0] : '');
    if (typeof this.state.form.coverPicture !== 'string')
      formData.append('coverPicture', typeof this.state.form.coverPicture !== 'string' ? this.state.form.coverPicture[0] : '');
    try {
      const res = await axios.put(`user/${id}`, formData, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 201) {
        this.setState(
          {
            ...this.state,
            loader: false,
          },
          () => {
            notificationSuccess('Update User', 'User updated successfully!');
            this.getUserById(this.state.form.id);
          }
        );
      } else {
        this.setState(
          {
            ...this.state,
            loader: false,
          },
          notificationError('Update User', 'Something wrong please try again!')
        );
      }
    } catch (error) {
      this.setState(
        {
          ...this.state,
          loader: false,
        },
        () => notificationError('Update User', error)
      );
    }
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.getCountries();
    if (id) this.getUserById(id);
  }

  render() {
    return (
      <Fragment>
        <div className='UserForm DBlock h-auto'>
          <h2>Edit User</h2>
          {this.state.loading ? (
            <Loader loader={this.state.loading} />
          ) : (
            <Fragment>
              <form className='form position-relative'>
                <Loader loader={this.state.loader} position={true} />
                <div className='form-row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      value={this.state.form.firstName}
                      placeholder='First Name'
                      onChange={(e) => this.handleState(e)}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      value={this.state.form.lastName}
                      onChange={(e) => this.handleState(e)}
                      placeholder='Last Name'
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={this.state.form.email} onChange={(e) => this.handleState(e)} placeholder='Email ID' />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='phone'>Phone Number</label>
                    <PhoneInput placeholder='Phone Number' value={this.state.form.phone} name='phone' onChange={(val) => this.handlePhone(val)} />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='countryId'>Country</label>
                    <select
                      className='CusSelect'
                      value={this.state.form.countryId}
                      name='countryId'
                      id='countryId'
                      onChange={(e) => this.handleCountry(e.target.value)}
                    >
                      <option value=''>Country</option>
                      {this.state.allCountries &&
                        this.state.allCountries.map((list, i) => (
                          <option key={i} value={list.id}>
                            {list.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='cityId'>City</label>
                    <select className='CusSelect' name='cityId' id='cityId' onChange={(e) => this.handleState(e)}>
                      <option value=''>City</option>
                      {this.state.allCities &&
                        this.state.allCities.map((list, i) => (
                          <option key={i} value={list.id}>
                            {list.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <div className='CheckPos'>
                      <label htmlFor='date-picker-dialog'>Date of birth</label>
                      <DateCustomPicker setDate={this.handleDate} value={this.state.form.dateOfBirth} />
                    </div>
                  </div>
                  <div className='col-12'>
                    <label htmlFor='description'>About Yourself</label>
                    <textarea
                      name='description'
                      id='description'
                      value={this.state.form.description}
                      onChange={(e) => this.handleState(e)}
                    ></textarea>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='parent_category_id'>Select Art-Category</label>
                    <select
                      className='CusSelect'
                      value={this.state.form.categoryParentId}
                      id='parent_category_id'
                      onChange={(e) => this.handleSubcategory(e.target.value)}
                    >
                      <option value=''>Select</option>
                      {this.state.category &&
                        this.state.category.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.category_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='categoryId'>Select Art-Subcategory</label>
                    <select name='categoryId' className='CusSelect' id='categoryId' onChange={(e) => this.handleState(e)}>
                      <option value=''>Select</option>
                      {this.state.subCategory &&
                        this.state.subCategory.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.category_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='linkedin'>LinkedIn link</label>
                    <input
                      type='text'
                      onChange={(e) => this.handleState(e)}
                      onBlur={(e) => validLinkedIn(e.target.value)}
                      value={this.state.form.linkedin}
                      placeholder='LinkedIn link'
                      name='linkedin'
                      id='linkedin'
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='whatsapp'>Whatsapp Number</label>
                    <PhoneInput
                      placeholder='Whatsapp Number'
                      name='whatsapp'
                      value={this.state.form.whatsapp}
                      onChange={(val) => this.handleWhatsApp(val)}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='profilePicture'>Profile Picture</label>
                    <button className='Overlay DFlex' id='profilePicture' type='button' data-toggle='modal' data-target='#exampleModalProfile'>
                      <span>{Array.isArray(this.state.form.profilePicture) ? this.state.form.profilePicture[0].name : 'Upload Profile Picture'}</span>
                      <button type='button'>UPLOAD</button>
                    </button>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='youtube'>Youtube link</label>
                    <input
                      type='text'
                      value={this.state.form.youtube}
                      onChange={(e) => this.handleState(e)}
                      onBlur={(e) => validYoutube(e.target.value)}
                      placeholder='Youtube Video Link'
                      name='youtube'
                      id='youtube'
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='profilePicture'>Cover Picture</label>
                    <button className='Overlay DFlex' type='button' data-toggle='modal' data-target='#exampleModalCover'>
                      <span>{Array.isArray(this.state.form.profilePicture) ? this.state.form.coverPicture[0].name : 'Upload Cover Picture'}</span>
                      <button type='button'>UPLOAD</button>
                    </button>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='website'>Website link</label>
                    <input
                      type='text'
                      onChange={(e) => this.handleState(e)}
                      value={this.state.form.website}
                      placeholder='Website Link'
                      onBlur={(e) => validWebsite(e.target.value)}
                      name='website'
                      id='website'
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='facebook'>Facebook link</label>
                    <input
                      type='text'
                      onChange={(e) => this.handleState(e)}
                      value={this.state.form.facebook}
                      placeholder='Facebook Link'
                      onBlur={(e) => validFacebook(e.target.value)}
                      name='facebook'
                      id='facebook'
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='instagram'>Instagram Username</label>
                    <input
                      type='text'
                      onChange={(e) => this.handleState(e)}
                      value={this.state.form.instagram}
                      placeholder='Instagram Username'
                      // onBlur={(e) => handleInstagram(e.target.value)}
                      name='instagram'
                      id='instagram'
                    />
                  </div>
                  <div className='col-12 mb-5'>
                    <FormControl component='fieldset' className='Role DFlex d-flex flex-row justify-content-center'>
                      <FormLabel component='role'>Role</FormLabel>
                      <RadioGroup className='flex-row' name='role' value={this.state.form.role} onChange={(e) => this.handleState(e)}>
                        <FormControlLabel value='artist-and-client' control={<Radio />} label='Artist + Client' />
                        <FormControlLabel value='client' control={<Radio />} label='Client' />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className='SubmitBtnDiv DFlex justify-content-end'>
                  <button type='button' className='SubmitBtn' onClick={() => this.updateUsers(this.state.form.id)}>
                    Update User
                  </button>
                </div>
              </form>
            </Fragment>
          )}
        </div>
        <div className='modal fade CropModal' id='exampleModalProfile' tabIndex='-1' aria-labelledby='exampleModalProfileLabel' aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header py-2'>
                <h5 className='modal-title' id='exampleModalProfileLabel'>
                  Profile Image
                </h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body p-0'>
                <CropProfileImage aspect={9 / 9} fileName='ProfileImage.png' handleImage={this.handleProfileImage} />
              </div>
            </div>
          </div>
        </div>
        <div className='modal fade CropModal' id='exampleModalCover' tabIndex='-1' aria-labelledby='exampleModalCoverLabel' aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header py-2'>
                <h5 className='modal-title' id='exampleModalCoverLabel'>
                  Cover Image
                </h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body p-0'>
                <CropProfileImage aspect={16 / 7} fileName='CoverImage.png' handleImage={this.handleCoverImage} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditUser;
