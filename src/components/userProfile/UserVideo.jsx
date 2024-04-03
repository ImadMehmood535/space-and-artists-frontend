import React, { Fragment, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const UserVideo = ({ user }) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (user) {
      setVideo(user.youtube);
    }
  }, [user]);

  return (
    <Fragment>
      <div className='ArtistPortVideo DBlock'>
        <div className='TitlePort DBlock h-auto'>
          <p>Check Video</p>
        </div>
        <div className='ArtistVideo DBlock'>
          {video ? (
            <ReactPlayer width='100%' height='100%' url={video} />
          ) : (
            <div className='DFlex justify-content-center h-100'>
              <h3>This artist has no video to show</h3>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserVideo;
