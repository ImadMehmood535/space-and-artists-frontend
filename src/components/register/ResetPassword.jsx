import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { notificationError, notificationSuccess, validateValue } from '../../common/constants';
import { baseUrl, headers } from '../../common/constants';
import Loader from '../../common/Loader';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      passwordType: true,
      confirmPasswordType: true,
      resetMessage: false,
      form: {
        password: '',
        confirmPassword: '',
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
    this.setState({
      ...this.state,
      loading: true,
    });
    const { password, confirmPassword, token } = this.state.form;
    let check = validateValue(password) && validateValue(confirmPassword);
    if (check === true) {
      if (password.length >= 6) {
        if (password === confirmPassword) {
          try {
            let data = {
              password,
              token,
            };
            const res = await axios.post(`reset-password`, data, { headers: headers.simple });
            if (res.status === 201) {
              this.setState(
                {
                  ...this.state,
                  resetMessage: true,
                  loading: false,
                },
                () => {
                  notificationSuccess('Recover Password', 'Password Reset successfully!');
                }
              );
            } else {
              notificationError('Recover Password', 'Something went wrong please try again!');
            }
          } catch (error) {
            this.setState(
              {
                ...this.state,
                loading: false,
              },
              () => {
                notificationError('Recover Password', error);
              }
            );
          }
        } else {
          this.setState(
            {
              ...this.state,
              loading: false,
            },
            () => {
              notificationError('Password', 'Password does not match!');
            }
          );
        }
      } else {
        this.setState(
          {
            ...this.state,
            loading: false,
          },
          () => {
            notificationError('Recover Password', 'Password must be greater then 6 character!');
          }
        );
      }
    } else {
      this.setState(
        {
          ...this.state,
          loading: false,
        },
        () => {
          notificationError('Recover Password', 'All fields are required!');
        }
      );
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
    const { confirmPassword, password } = this.state.form;
    return (
      <Fragment>
        <div className='AccountSec DBlock'>
          <div className='container'>
            <div className='AccountOuterDiv DBlock'>
              <div className='AccountForm DBlock'>
                <div className='Title DBlock h-auto text-center'>
                  <h2>Recover Password!</h2>
                </div>
                <div className='FormTab DBlock'>
                  {this.state.resetMessage ? (
                    <div className='ResetMessageDiv DFlex justify-content-center'>
                      <p>You password has bees reset. Please login with the new password!</p>
                    </div>
                  ) : (
                    <Fragment>
                      {this.state.loading ? (
                        <Loader loader={this.state.loading} />
                      ) : (
                        <form className='form OtherForm'>
                          <div className='form-row'>
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
                            <div className='col-12 mb-3'>
                              <input
                                type={this.state.confirmPasswordType ? 'password' : 'text'}
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => this.handleState(e)}
                                placeholder='Confirm Password*'
                              />
                              <button
                                className='Eye'
                                type='button'
                                style={{ right: 0 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({ ...this.state, confirmPasswordType: !this.state.confirmPasswordType });
                                }}
                              >
                                <i className='fas fa-eye icon'></i>
                              </button>
                            </div>
                            <div className='col-12 my-3 d-flex justify-content-end'>
                              <button type='button' onClick={() => this.handleSubmit()} className='SubmitBtn'>
                                Recover Password
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResetPassword;
