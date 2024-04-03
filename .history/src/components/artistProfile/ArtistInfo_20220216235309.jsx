import React, { Fragment, useState } from 'react';
import ReactWhatsapp from 'react-whatsapp';
import { Modal, Button, Form } from "react-bootstrap";
// import share from '../../../public/assets/images/share.png'

const ArtistInfo = ({ profile }) => {
  const BG = {
    backgroundImage: '/assets/images/share.png',
  };
  console.log(BG);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(profile);
  return (
    <Fragment>
      <div className='ArtistInfoDiv DFlex'>
        <div className='ArtistImgDiv DBlock'>
          <div className='ImgDiv DBlock'>
            <img src={profile ? profile.profilePicture : ''} alt='' className='' />
          </div>
          <div className='ReactText DBlock d-none d-md-flex h-auto'>
            <p>Reach out to me:</p>
          </div>
          <ul className='ReactLinkUl DFlex d-none d-md-flex'>
            {profile && profile.whatsapp !== null && profile.whatsapp !== 'null' && profile.whatsapp !== '' ? (
              <li>
                <ReactWhatsapp number={profile.whatsapp} className='bg-transparent border-0'>
                  <a href='#!'>
                    <i className='fab fa-whatsapp icon'></i>
                  </a>
                </ReactWhatsapp>
              </li>
            ) : null}
            {profile && profile.instagram !== null && profile.instagram !== 'null' && profile.instagram !== '' ? (
              <li>
                <a href={profile.instagram} target='blank'>
                  <i className='fab fa-instagram icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-instagram icon'></i>
                </a>
              </li>
            )}
            {profile && profile.linkedin !== null && profile.linkedin !== 'null' && profile.linkedin !== '' ? (
              <li>
                <a href={profile.linkedin} target='blank'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            )}
            {profile && profile.website !== null && profile.website !== 'null' && profile.website !== '' ? (
              <li>
                <a href={profile.website} target='blank'>
                  <i className='fas fa-globe icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fas fa-globe icon'></i>
                </a>
              </li>
            )}
            {/* {profile && profile.website !== null && profile.website !== 'null' && profile.website !== '' ? (
              <li>
                <a href={profile.website} target='blank'>
                  <i className='fas fa-share icon'></i>
                </a>
              </li>
            ) : ( */}
            <li>
              <a href='#' onClick={handleShow}>
                <img src={BG.backgroundImage} alt="" />
              </a>
            </li>
            {/* )} */}
          </ul>
        </div>
        <div className='ArtistTextDiv DBlock'>
          <div className='Title DBlock'>
            <h3>{profile ? profile.firstName + ' ' + profile.lastName : ''}</h3>
            <p>
              {profile ? profile.cityName : 'N/A'}, {profile ? profile.countryName : ''}
            </p>
          </div>
          <div className='Description DBlock'>
            <div className='Description DFlex justify-content-start BB'>
              <h5>{profile.categoryParentName}</h5> <h6>{profile.categoryName}</h6>
            </div>
            <b>Description:</b>
            <p>{profile ? profile.description : ''}</p>
          </div>
          <div className='ReactText DBlock d-flex d-md-none'>
            <p>Reach out to me:</p>
          </div>
          <ul style={{ width: '100%', marginBottom: '-15px' }} className='ReactLinkUl DFlex d-flex d-md-none'>
            {profile && profile.whatsapp !== null && profile.whatsapp !== 'null' && profile.whatsapp !== '' ? (
              <li>
                <ReactWhatsapp number={profile.whatsapp} className='bg-transparent border-0'>
                  <a href='#!'>
                    <i className='fab fa-whatsapp icon'></i>
                  </a>
                </ReactWhatsapp>
              </li>
            ) : null}
            {profile && profile.facebook !== null && profile.facebook !== 'null' && profile.facebook !== '' ? (
              <li>
                <a href={profile.facebook} target='blank'>
                  <i className='fab fa-facebook-f icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-facebook-f icon'></i>
                </a>
              </li>
            )}
            {profile && profile.instagram !== null && profile.instagram !== 'null' && profile.instagram !== '' ? (
              <li>
                <a href={profile.instagram} target='blank'>
                  <i className='fab fa-instagram icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-instagram icon'></i>
                </a>
              </li>
            )}
            {profile && profile.linkedin !== null && profile.linkedin !== 'null' && profile.linkedin !== '' ? (
              <li>
                <a href={profile.linkedin} target='blank'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            )}
            {profile && profile.website !== null && profile.website !== 'null' && profile.website !== '' ? (
              <li>
                <a href={profile.website} target='blank'>
                  <i className='fas fa-globe icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fas fa-globe icon'></i>
                </a>
              </li>
            )}
            <li>
              <a href='#' onClick={handleShow}>
                <img src={BG.backgroundImage} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <span style={{ color: '#faad14' }}>Share this Profile</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', fontSize: '20px' }} className='ReactLinkUl DFlex'>
            {profile && profile.whatsapp !== null && profile.whatsapp !== 'null' && profile.whatsapp !== '' ? (
              <li>
                <ReactWhatsapp number={profile.whatsapp} className='bg-transparent border-0'>
                  <a href='#!'>
                    <i className='fab fa-whatsapp icon'></i>
                  </a>
                </ReactWhatsapp>
              </li>
            ) : null}
            {profile && profile.facebook !== null && profile.facebook !== 'null' && profile.facebook !== '' ? (
              <li>
                <a href=`{` target='blank'>
                  <i className='fab fa-facebook-f icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-facebook-f icon'></i>
                </a>
              </li>
            )}
            {profile && profile.pinterest !== null && profile.pinterest !== 'null' && profile.pinterest !== '' ? (
              <li>
                <a href={profile.pinterest} target='blank'>
                  <i className='fab fa-pinterest icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-pinterest icon'></i>
                </a>
              </li>
            )}
            {profile && profile.linkedin !== null && profile.linkedin !== 'null' && profile.linkedin !== '' ? (
              <li>
                <a href={profile.linkedin} target='blank'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            ) : (
              <li>
                <a href='#!' className='disabled'>
                  <i className='fab fa-linkedin-in icon'></i>
                </a>
              </li>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: '#000', border: '#faad14', color: '#fff' }} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#faad14', border: '#faad14', color: '#fff' }} variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

  );
};



export default ArtistInfo;
