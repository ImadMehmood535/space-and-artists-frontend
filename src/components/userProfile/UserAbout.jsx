import React, { useState, Fragment, useEffect } from 'react';
import UserVideo from './UserVideo';
import { RMIUploader } from 'react-multiple-image-uploader';
import { headers, notificationError } from '../../common/constants';
import { baseUrl, notificationSuccess } from './../../common/constants';
import axios from 'axios';

const UserAbout = (props) => {
  const [dataSources, setDataSources] = useState([]);
  const [visible, setVisible] = useState(true);

  const getUploadedImages = async (id) => {
    try {
      const res = await axios.get(`gallery/${id}`, {
        headers: {
          ...headers.simple,
          authorization: props.user.token,
        },
      });
      if (res.status === 200) {
        let images = [];
        res.data.map((list, i) => {
          images[i] = {
            id: list.id,
            dataURL: list.file_name,
          };
        });
        setDataSources(images);
      } else {
        notificationError('Gallery Images', 'Something went wrong. Please try again!');
      }
    } catch (error) {
      setDataSources([]);
      notificationError('Gallery Images', error);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onUpload = async (data) => {
    let formData = new FormData();
    data.map((list) => {
      formData.append('file_name', list.file);
    });
    try {
      const res = await axios.post(`gallery/${props.user.id}`, formData, {
        headers: {
          ...headers.image,
          authorization: props.user.token,
        },
      });
      if (res.status === 200) {
        getUploadedImages(props.user.id);
        notificationSuccess('Gallery Image', 'Images uploaded successfully!');
      }
    } catch (error) {
      notificationError('Gallery Image', error);
    }
  };

  const onSelect = (data) => {
    console.log('Select files', data);
  };

  const onRemove = async (id) => {
    try {
      const res = await axios.delete(`gallery/${id}`, {
        headers: {
          ...headers.simple,
          authorization: props.user.token,
        },
      });
      if (res.status === 204) {
        console.log('Here');
        notificationSuccess('Image', 'Image deleted successfully!');
        getUploadedImages(props.user.id);
      } else {
        getUploadedImages(props.user.id);
        notificationError('Gallery Image', 'Something went wrong. Please try again!');
      }
    } catch (error) {
      getUploadedImages(props.user.id);
      notificationError('Gallery Image', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    if (props.user.id) getUploadedImages(props.user.id);
  }, [props.user]);

  return (
    <Fragment>
      <div className='ArtistPortDiv DBlock'>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <UserVideo user={props.user} />
          </div>
          <div className='col-md-6 mb-3'>
            <div className='ArtistPortGallery DBlock'>
              <div className='TitlePort DBlock h-auto'>
                <p>Check Gallery</p>
              </div>
              <div className='AccordionGallery DBlock'>
                <RMIUploader
                  size={6}
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={onSelect}
                  onUpload={onUpload}
                  onRemove={onRemove}
                  dataSources={dataSources}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAbout;
