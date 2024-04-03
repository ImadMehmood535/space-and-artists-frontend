import React, { Fragment, useEffect, useState } from 'react';
import InputFiles from 'react-input-files';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { notificationError } from '../../common/constants';
import { headers, baseUrl } from './../../common/constants';

const FormStepTwo = (props) => {
  const [category, setCategory] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/all`, { headers: headers.simple });
      setCategory(res.data);
    } catch (error) {
      notificationError('Categories', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Fragment>
      <form action='' className='form OtherForm' autoComplete='off'>
        <div className='form-row'>
          <div className='col-12'>
            <textarea
              name='description'
              value={props.form.description}
              placeholder='About Yourself'
              onChange={(e) => props.handleState(e)}
            ></textarea>
          </div>
          <div className='col-md-6 mb-3'>
            <select name='category_id' className='CusSelect' id='category_id' onChange={(e) => props.handleState(e)}>
              {category &&
                category.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className='col-md-6 mb-3'>
            <input
              type='text'
              onChange={(e) => props.handleState(e)}
              value={props.form.linkedin_link}
              placeholder='LinkedIn link'
              name='linkedin_link'
            />
          </div>
          <div className='col-md-6 mb-3'>
            <PhoneInput
              placeholder='Whatsapp Number*'
              name='whatsapp_number'
              value={props.form.whatsapp_number}
              onChange={(val) => props.handleWhatsApp(val)}
            />
          </div>
          <div className='col-md-6 mb-3'>
            <InputFiles onChange={(files) => props.handleProfileImage(files)}>
              <div className='Overlay DFlex'>
                <span>{props.form.profile_picture !== '' ? props.form.profile_picture[0].name : 'Upload Profile Picture'}</span>
                <button>UPLOAD</button>
              </div>
            </InputFiles>
          </div>
          <div className='col-md-6 mb-3'>
            <input
              type='text'
              value={props.form.youtube}
              onChange={(e) => props.handleState(e)}
              placeholder='Embed Youtube Video Link'
              name='youtube'
            />
          </div>
          <div className='col-md-6 mb-3'>
            <InputFiles onChange={(files) => props.handleCoverImage(files)}>
              <div className='Overlay DFlex'>
                <span>{props.form.cover_picture !== '' ? props.form.cover_picture[0].name : 'Upload Cover Picture'}</span>
                <button>UPLOAD</button>
              </div>
            </InputFiles>
          </div>
          <div className='col-md-6 mb-3'>
            <input
              type='text'
              onChange={(e) => props.handleState(e)}
              value={props.form.website_link}
              placeholder='Website Link'
              name='website_link'
            />
          </div>
        </div>
        <div className='NextBtn DFlex justify-content-end my-5'>
          <button type='button' className='AccountBtn SubmitBtn' onClick={() => props.handleSteps('StepOne')}>
            Previous
          </button>
          <button type='button' className='AccountBtn SubmitBtn' onClick={() => props.handleSubmit()}>
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default FormStepTwo;
