import React, { Fragment } from 'react';

const ArtistEditModal = () => {
  const BG = {
    backgroundImage: 'url(/assets/images/ProfileImgBg.png)',
  };
  return (
    <Fragment>
      <div
        className='modal fade EditProfileModal'
        id='staticBackdrop'
        data-backdrop='static'
        data-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                Edit Profile
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='EditProfileModalDiv DBlock'>
                <form action='' className='row'>
                  <div className='col-md-12'>
                    <div className='ProfileImgDiv DBlock'>
                      <div className='ImgDiv DBlock' style={BG}>
                        <button type='button' className='EditBtn'>
                          <i className='icon fas fa-pencil-alt'></i>
                        </button>
                        <img src='/assets/images/Artist1.png' alt='' className='' />
                      </div>
                      <div className='ImgCoverDiv DBlock'>
                        <button type='button' className='EditBtn'>
                          <i className='icon fas fa-pencil-alt'></i>
                        </button>
                        <img src='/assets/images/ArtistHeadImg.png' alt='' className='' />
                      </div>
                    </div>
                    <div className='FormDiv DBlock'>
                      <div className='form-row'>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>First Name*</label>
                          <input type='text' name='' placeholder='Dwayne  Johnson' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Last Name*</label>
                          <input type='text' name='' placeholder='Osas' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>City*</label>
                          <input type='text' name='' placeholder='Dubai' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Country / Region*</label>
                          <input type='text' name='' placeholder='United Arab Emirates' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Industry*</label>
                          <input type='text' name='' placeholder='Fitness' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Profession *</label>
                          <input type='text' name='' placeholder='MMA Trainer ' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Years of Experience*</label>
                          <input type='text' name='' placeholder='5+ Years' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Whatsapp*</label>
                          <input type='text' name='' placeholder='+971 56 1234 567' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Facebook</label>
                          <input type='text' name='' placeholder='www.Facebook.com/User.lorem' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Instagram</label>
                          <input type='text' name='' placeholder='www.instagram/user/12341249' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>LinkedIn</label>
                          <input type='text' name='' placeholder='www.Linkedin./user/123214124' id='' />
                        </div>
                        <div className='col-12 mb-3'>
                          <label htmlFor=''>Website</label>
                          <input type='text' name='' placeholder='www.userprofile/portfolio.com' id='' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12 d-flex justify-content-end'>
                    <button type='submit' className='FormSub'>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ArtistEditModal;
