import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className='AccountSec DBlock'>
          <div className='container'>
            <div className='AccountOuterDiv DBlock'>
              <div className='AccountForm DBlock'>
                <div className='Title DBlock h-auto'>
                  <h2>Dive In!</h2>
                </div>
                <div className='FormTab DBlock'>
                  <form className='form OtherForm'>
                    <div className='form-row'>
                      <div className='col-12 mb-3'>
                        <input type='text' name='email' required id='DiveUsername' placeholder='USERNAME' />
                      </div>
                      <div className='col-12 mb-3'>
                        <input type='password' name='DivePassword' required id='DivePassword' placeholder='PASSWORD' />
                      </div>
                      <div className='col-12 mb-3'>
                        <div className='Desc DFlex'>
                          <Link to='#!' onClick={() => this.setState({ ...this.state, isForgot: true })}>
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className='col-12 my-3 d-flex justify-content-end'>
                        <button type='submit' className='SubmitBtn'>
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
