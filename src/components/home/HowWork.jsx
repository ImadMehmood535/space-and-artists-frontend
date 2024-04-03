import React, { Component, Fragment } from 'react';

class HowWork extends Component {
  render() {
    return (
      <Fragment>
        <div className='HowWorkSec DBlock'>
          <div className='container'>
            <div className='HowWorkOuterDiv DBlock'>
              <div className='TitleStyle Title DBlock h-auto'>
                <h2>How it works?</h2>
                <p>Take that leap of faith and get started</p>
              </div>
              <div className='WorkExpDiv DBlock'>
                <div className='row'>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='HowWorkDiv DBlock'>
                      <img src='/assets/images/Work1.png' alt='' />
                    </div>
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='HowWorkDiv DBlock'>
                      <img src='/assets/images/Work2.png' alt='' />
                    </div>
                  </div>
                  <div className='col-md-4 col-sm-6 mb-3'>
                    <div className='HowWorkDiv DBlock'>
                      <img src='/assets/images/Work3.png' alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HowWork;
