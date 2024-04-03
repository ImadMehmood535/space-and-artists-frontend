import React, { Fragment, useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { headers, notificationError, validateEmail } from '../../../common/admin/constants';
import axios from 'axios';
import { UserContext } from '../../../App';
import Loader from '../../../common/admin/Loader';
import { Redirect } from 'react-router';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  localStorage.setItem('userEmail' , values.email);
  localStorage.setItem('userInformation' , JSON.stringify(values));

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateEmail(values.email)) {
      if (values.password && values.password.length >= 6) {
        try {
          const res = await axios.post('admin/login', values, { headers: headers.simple });
          if (res.status === 200) {
            setLoading(false);
            setValues({
              email: '',
              password: '',
            });
            dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: res.data });
          } else {
            setLoading(false);
            notificationError('Login', 'Something went wrong please try again later!');
          }
        } catch (error) {
          setLoading(false);
          notificationError('Login', error);
        }
      } else {
        setLoading(false);
        notificationError('Password', 'Password must be at least 6 characters!');
      }
    } else {
      setLoading(false);
      notificationError('Email', 'Email must be valid email!');
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      {state.adminLogin ? (
        <Redirect push to='/admin/users' />
      ) : (
        <div className='LoginWrapper DBlock'>
          <div className='container'>
            <div className='LoginDiv DFlex justify-content-center flex-column'>
              <Loader position={true} loader={loading} />
              <div className='LogoDiv DFlex justify-content-center'>
                {/* <img src='/assets/images/logo.svg' alt='' className='Logo' /> */}
                <p>Login as an admin</p>
              </div>
              <form autoComplete='off' noValidate className='form'>
                <div className='form-row'>
                  <div className='col-12 mb-3'>
                    <FormControl>
                      <InputLabel htmlFor='standard-adornment-email'>User Name</InputLabel>
                      <Input id='standard-adornment-email' type='email' name='email' value={values.email} onChange={(e) => handleChange(e)} />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
                      <Input
                        id='standard-adornment-password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className='col-12'>
                    <button className='SubmitBtn mx-auto' type='button' onClick={(e) => handleSubmit(e)}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
