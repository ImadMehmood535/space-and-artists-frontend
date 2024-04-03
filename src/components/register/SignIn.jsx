import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { notificationError, notificationSuccess, validateEmail, validateValue } from '../../common/constants';
import { headers } from './../../common/constants';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordType: true,
      form: {
        email: '',
        password: '',
        token: null,
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

  handleSubmit = async () => {
    let check = validateValue(this.state.form.email) && validateValue(this.state.form.password);
    if (check === true) {
      if (this.state.form.password.length >= 6) {
        try {
          const res = await axios.post('verify-account', this.state.form, { headers: headers.simple });
          if (res.status === 200) {
            notificationSuccess('Activate Account', 'Your account has been activated successfully!');
          } else {
            notificationError('Activate Account', 'Something went wrong please try again!');
          }
        } catch (error) {
          notificationError('Activate Account', error);
        }
      } else {
        notificationError('Activate Account', 'Password must be greater then 6 character!');
      }
    } else {
      notificationError('Activate Account', 'All fields are required!');
    }
  };

  componentDidMount() {
    let token = this.props.match.params.match;
    if (token) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          token,
        },
      });
    }
  }

  render() {
    const { email, password } = this.state.form;
    return (
      <Fragment>
        <div className='AccountSec DBlock'>
          <div className='container'>
            <div className='AccountOuterDiv DBlock'>
              <div className='AccountForm DBlock'>
                <div className='Title DBlock h-auto text-center'>
                  <h2>Activate Account!</h2>
                  <p>Dive in first time to activate your account!</p>
                </div>
                <div className='FormTab DBlock'>
                  <form className='form OtherForm'>
                    <div className='form-row'>
                      <div className='col-12 mb-3'>
                        <input
                          type='email'
                          value={email}
                          onChange={(e) => this.handleState(e)}
                          name='email'
                          required
                          id='DiveUsername'
                          placeholder='USERNAME'
                        />
                      </div>
                      <div className='col-12 mb-3'>
                        <input
                          type={this.state.passwordType ? 'password' : 'text'}
                          value={password}
                          name='password'
                          onChange={(e) => this.handleState(e)}
                          placeholder='Password*'
                        />
                        <button
                          className='Eye'
                          type='button'
                          style={{ right: 0 }}
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ ...this.state, passwordType: !this.state.passwordType });
                          }}
                        >
                          <i className='fas fa-eye icon'></i>
                        </button>
                      </div>
                      <div className='col-12 my-3 d-flex justify-content-end'>
                        <button type='button' onClick={() => this.handleSubmit()} className='SubmitBtn'>
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
