import React, { Fragment } from 'react';

const Loader = ({ loader, height, absolute }) => {
  return (
    <Fragment>
      <div className={`ParentLoader DBlock ${loader ? 'd-block' : 'd-none'} ${height ? 'MinHeight' : ''} ${absolute ? 'position-absolute' : ''}`}>
        <div className='LoaderDiv DFlex justify-content-center h-100'>
          <div className='multi-spinner-container'>
            <div className='multi-spinner'>
              <div className='multi-spinner'>
                <div className='multi-spinner'>
                  <div className='multi-spinner'>
                    <div className='multi-spinner'>
                      <div className='multi-spinner'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
