import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  notificationError,
  validateValue,
  baseUrl,
  headers,
  notificationSuccess,
  validateEmail,
  dynamicSort,
} from "./../../common/constants";
import Loader from "../../common/Loader";
import { UserContext } from "../../App";
import $ from "jquery";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const clientId =
  "170247173651-nu7j93eud88vkmeshj6dbs7r06qs8646.apps.googleusercontent.com";

const BG = {
  backgroundImage: "url(/assets/svg/menu.svg)",
};

const Header = () => {
  const [parent, setParent] = useState([]);
  const [countryImage, setCountryImage] = useState("UAE");
  const [typePassword, setTypePassword] = useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [category, setCategory] = useState("");
  const [checkToken , setCheckToken] = useState("");
  const [oldCategories, setOldCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isForgot, setIsForgot] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({ email: "", password: "" });
  const { state, dispatch } = useContext(UserContext);

  const [subscriptionStatus , checkSubscriptionStatus] = useState("");


  const history = useHistory();
  const handleState = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const getCountry = async () => {
    try {
      const res = await axios.get("http://ip-api.com/json");
      if (res.status === 200) {
        let country = res.data;
        if (country.countryCode === "CA") {
          setCountryImage("CA");
        } else if (country.countryCode === "IN") {
          setCountryImage("IN");
        } else {
          setCountryImage("UAE");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    setLoader(true);
    let values = validateValue(value.email) && validateValue(value.email);
    if (values === true) {
      try {
        const res = await axios.post(`login`, value, {
          headers: headers.simple,
        });
        if (res.status === 200) {
          const paymentres = await axios.post(`/payments/getPayments/${value.email}`);
          checkSubscriptionStatus(paymentres.data[0].statusSubscribe);
          console.log('sdsad' , subscriptionStatus);
          try {
            if (paymentres.data.map(x => x.statusSubscribe === 'Active')) {
              console.log('status is active' , paymentres)
              const userInfo = {
                email: res.data[0]['email'],
                phone: res.data[0]['phone'],
                whatsapp: res.data[0]['whatsapp'],
                firstname: res.data[0]['firstName'],
                lastname: res.data[0]['lastName'], 
              }
    
              localStorage.setItem('user_email' , res.data[0].email);
              localStorage.setItem('userInformation' , JSON.stringify(userInfo));
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
              setLoader(false);
              setValue({ email: "", password: "" });
              notificationSuccess("Login", "You have logged in!");
              window.location.href = "/";
            } else if(paymentres.data.map(x => x.statusSubscribe === 'Expire')){
              notificationError('Subscription', 'Please renew your subscription to explore more');
              const userInfo = {
                email: res.data[0]['email'],
                phone: res.data[0]['phone'],
                whatsapp: res.data[0]['whatsapp'],
                firstname: res.data[0]['firstName'],
                lastname: res.data[0]['lastName'], 
              }
              localStorage.setItem('user_email' , res.data[0].email);
              localStorage.setItem('userInformation' , JSON.stringify(userInfo));
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
              setLoader(false);
              setValue({ email: "", password: "" });
              window.location.href = "/usersubscribe";
            }
            }
          catch (error) {
            setLoader(false);
              notificationError('Subscription', 'Please renew your subscription to explore more');
              history.push('/usersubscribe');
          }
        }
      } catch (error) {
        setLoader(false);
        notificationError("Login", error);
      }
    } else {
      setLoader(false);
      notificationError("Login", "All fields are required");
    }
  };

  const onSuccess = async (res) => {
    var data = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.name.split(res.profileObj.givenName)[1],
      type: "google",
      email: res.profileObj.email,
    };
    const response = await axios.post(`social-sign-in`, data, {
      headers: { ContentType: "application/json" },
    });
    if (response.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setLoader(false);
      setValue({ email: "", password: "" });
      notificationSuccess("Login", "You have logged in!");
    }
    // refreshTokenSetup(res);
  };

  const onFailure = async (res) => {
    // console.log("Login failed: res:", res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`category/all`, { headers: headers.simple });
      if (res.status === 200) {
        let data = res.data.sort(dynamicSort("category_name"));
        setCategories(data);
        setSubCategories([]);
        setParent([]);
        setOldCategories(data);
      }
    } catch (error) {
      notificationError("Categories", "Something went wrong. Please try again");
    }
  };

  const getCategoryByParent = async (e, id) => {
    e.preventDefault();
    let parent = categories.filter((item) => item.id == id);
    setParent(parent);
    try {
      const res = await axios.get(`category/all/${id}`, {
        headers: headers.simple,
      });
      if (res.status === 200) {
        let data = res.data.sort(dynamicSort("category_name"));
        setCategories([]);
        setOldCategories(data);
        setSubCategories(data);
      }
    } catch (error) {
      notificationError("Categories", "Something went wrong. Please try again");
    }
  };

  const handleSearch = (e) => {
    setCategory(e.target.value);
    if (validateValue(e.target.value)) {
      setCategories(
        categories.filter((item) =>
          item.category_name.toLowerCase().includes(e.target.value)
        )
      );
      setSubCategories(
        subCategories.filter((item) =>
          item.category_name.toLowerCase().includes(e.target.value)
        )
      );
    } else {
      setCategories(oldCategories);
    }
  };

  const handleForgotEmail = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (validateEmail(forgotEmail) === true) {
      let data = { email: forgotEmail };
      try {
        const res = await axios.post(`forgot-password`, data, {
          headers: headers.simple,
        });
        if (res.status === 200) {
          setLoader(false);
          notificationSuccess(
            "Forgot Password",
            "Recovery password link sent to your email!"
          );
        } else {
          setLoader(false);
          notificationError(
            "Forgot Password!",
            "Something went wrong please try again!"
          );
        }
      } catch (error) {
        setLoader(false);
        notificationError("Forgot Password!", error);
      }
    } else {
      setLoader(false);
      notificationError("Forgot Password!", "Invalid email address!");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user_email');
    localStorage.removeItem('userInformation');
    notificationSuccess("Logout", "You have signed out successfully!");
    setTimeout(() => {
      window.location.href = "/";
      dispatch({ type: "LOGOUT" });
    }, 1000);
  };

  const responseFacebook = async (res) => {
    var data = {
      firstName: res.first_name,
      lastName: res.last_name,
      type: "facebook",
      email: res.email,
    };
    const response = await axios.post(`social-sign-in`, data, {
      headers: { ContentType: "application/json" },
    });
    if (response.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      setLoader(false);
      setValue({ email: "", password: "" });
      notificationSuccess("Login", "You have logged in!");
    }
  };

  const expireStatus = () => {
    alert('Please renew your subscription');
  }

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const tokenValid = userToken ? userToken : null;
    setCheckToken(tokenValid);
    getAllCategories();
    getCountry();
    $(document).ready(function () {
      $(".SearchDropChild").on("click", function () {
        setTimeout(() => {
          const $this = $(".SearchDropParent");
          $this.addClass("show");
          $this.find(".dropdown-toggle").attr("aria-expanded", "true");
          $this.find(".dropdown-menu").addClass("show");
        }, 100);
      });
      $(".RemoveParent").on("click", function () {
        setTimeout(() => {
          const $this = $(".SearchDropParent");
          $this.removeClass("show");
          $this.find(".dropdown-toggle").attr("aria-expanded", "false");
          $this.find(".dropdown-menu").removeClass("show");
        }, 200);
      });
      $(".ForgotDropChild").on("click", function () {
        setTimeout(() => {
          const $this = $(".ForgotDropParent");
          $this.addClass("show");
          $this.find(".dropdown-toggle").attr("aria-expanded", "true");
          $this.find(".dropdown-menu").addClass("show");
        }, 100);
      });
    });
  }, []);
  return (
    <Fragment>
      <header className="Header DBlock">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-light">
          {subscriptionStatus === 'Expire' ? 
                <Link className="navbar-brand" onClick={() => expireStatus()} to="/usersubscribe">
                <img
                  src="/assets/svg/logo.svg"
                  className="d-none d-md-block"
                  alt=""
                />
                <img
                  src="/assets/svg/MobileLogo.svg"
                  className="d-block d-md-none"
                  alt=""
                />
              </Link>
              : 
              <Link className="navbar-brand" to="/">
              <img
                src="/assets/svg/logo.svg"
                className="d-none d-md-block"
                alt=""
              />
              <img
                src="/assets/svg/MobileLogo.svg"
                className="d-block d-md-none"
                alt=""
              />
            </Link>
            
               } 
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" style={BG}></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
              {subscriptionStatus === 'Expire' ? 
              <li className="nav-item">
             
               </li> : 
               <li className="nav-item">
               <Link className="nav-link" to="/leads">
                 Explore
               </Link>
                </li>
               } 
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">
                    about us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">
                    Blog
                  </Link>
                </li>
                {subscriptionStatus === 'expire' ? 
                <li className="nav-item dropdown SearchDropParent">
                  <Link
                    className="nav-link dropdown-toggle "
                    to="#!"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    SEARCH
                  </Link>
                  <div
                    className="dropdown-menu SearchDropChild"
                    aria-labelledby="navbarDropdown"
                  >
                    <div className="SearchDrop DBlock">
                      <div className="Title DBlock h-auto">
                        <h4>
                          WHAT ARE YOU <br /> LOOKING FOR?
                        </h4>
                      </div>
                      <div className="Body DBlock">
                        {/* <form action='' className='form DFlex'>
                          <input type='text' name='Search' id='Search' onChange={(e) => handleSearch(e)} placeholder='Search here...' required />
                          <button type='button' className='SearchBtn'>
                            <i className='fas fa-search'></i>
                          </button>
                        </form> */}
                        <h6>
                          Categories{" "}
                          {parent.length > 0 ? (
                            <Fragment>
                              <i className="fas fa-chevron-right icon"></i>{" "}
                              {parent[0].category_name}
                            </Fragment>
                          ) : (
                            ""
                          )}
                        </h6>
                        {subCategories.length > 0 ? (
                          <button
                            className="BackBtn"
                            onClick={() => getAllCategories()}
                          >
                            Back
                          </button>
                        ) : (
                          ""
                        )}
                        <ul className="SearchUl DFlex">
                          {categories.length > 0 &&
                            categories.map((list, i) => (
                              <Fragment key={i}>
                                <li>
                                  <Link
                                    to={`/leads/${list.id}`}
                                    onClick={(e) =>
                                      getCategoryByParent(e, list.id)
                                    }
                                  >
                                    {list.category_name}
                                  </Link>
                                </li>
                              </Fragment>
                            ))}
                          {subCategories.length > 0 &&
                            subCategories.map((list, i) => (
                              <Fragment key={i}>
                                <li>
                                  <Link
                                    className="RemoveParent"
                                    to={`/leads/${list.id}`}
                                  >
                                    {list.category_name}
                                  </Link>
                                </li>
                              </Fragment>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li> : 
                <li className="nav-item">
                <Link className="nav-link" to="/usersubscribe" onClick={() => expireStatus()}>
                  Search
                </Link>
                 </li>
                 }
                {state.isLogin ? (
                  <Fragment>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle NoBefore"
                        to="#!"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Account
                      </Link>
                      <div
                        className="dropdown-menu Account"
                        aria-labelledby="navbarDropdown"
                      >
                        <div className="DevnDropDown DBlock">
                          <ul className="LogUl DBlock">
                            <li>
                              <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                              <Link to="/usersubscribe">Subscriptions</Link>
                            </li>
                            <li>
                              <Link
                                to="#!"
                                className="border-0"
                                onClick={(e) => handleLogout(e)}
                              >
                                SIGN OUT
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li className="nav-item dropdown ForgotDropParent">
                      <Link
                        className="nav-link dropdown-toggle NoBefore"
                        to="#!"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        SIGN UP/LOG IN
                      </Link>
                      <div
                        className="dropdown-menu ForgotDropChild"
                        aria-labelledby="navbarDropdown"
                      >
                        <div className="DevnDropDown DBlock">
                          {isForgot ? (
                            <Fragment>
                              <div className="Title DFlex justify-content-start">
                                <h4>Recover</h4>
                                <img src="/assets/svg/LogoOnly.svg" alt="" />
                              </div>
                              <p>
                                Tell us the email address or phone number
                                associated with your{" "}
                                <Link to="/sign-up">
                                  spacenartists Account.
                                </Link>
                              </p>
                              {loader ? (
                                <Loader loader={loader} height={true} />
                              ) : (
                                <form className="form">
                                  <div className="form-row">
                                    <div className="col-12 mb-3">
                                      <input
                                        type="email"
                                        value={forgotEmail}
                                        name="forgotEmail"
                                        id="forgotEmail"
                                        onChange={(e) =>
                                          setForgotEmail(e.target.value)
                                        }
                                        placeholder="Enter your email!"
                                      />
                                    </div>
                                    <div className="col-12 my-3">
                                      <button
                                        type="button"
                                        className="DiveBtn"
                                        onClick={(e) => handleForgotEmail(e)}
                                      >
                                        RECOVER
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              )}
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Loader loader={loader} />
                              <div className="Title DFlex justify-content-start">
                                <h4>Log in</h4>
                                <img src="/assets/svg/LogoOnly.svg" alt="" />
                              </div>
                              <p>
                                Don’t have an account?{" "}
                                <Link to="/sign-up">Create Now.</Link>
                              </p>
                              <form className="form">
                                <div className="form-row">
                                  <div className="col-12 mb-3">
                                    <input
                                      type="text"
                                      name="email"
                                      required
                                      value={value.email}
                                      onChange={(e) => handleState(e)}
                                      placeholder="USERNAME"
                                    />
                                  </div>
                                  <div className="col-12 mb-3">
                                    <div className="PosInputDiv DBlock">
                                      <input
                                        type={
                                          typePassword ? "password" : "text"
                                        }
                                        name="password"
                                        required
                                        onChange={(e) => handleState(e)}
                                        value={value.password}
                                        placeholder="PASSWORD"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setTypePassword(!typePassword)
                                        }
                                        className="DFlex justify-content-center PosIcon"
                                      >
                                        <i className="fas fa-eye icon"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-12 mb-3">
                                    <div className="Desc DFlex">
                                      <Link
                                        to="#!"
                                        onClick={() => setIsForgot(true)}
                                      >
                                        Forgot password?
                                      </Link>
                                      <div className="Remember DFlex">
                                        <input
                                          type="checkbox"
                                          name="Remember"
                                          defaultChecked
                                          id="Remember"
                                        />
                                        <label htmlFor="Remember">
                                          Remember Me
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 my-3">
                                    <button
                                      type="button"
                                      className="DiveBtn _custom_login_btn"
                                      onClick={() => handleLogin()}
                                    >
                                      Log in
                                    </button>

                                    <GoogleLogin
                                      clientId={clientId}
                                      buttonText="LOGIN WITH GOOGLE"
                                      onSuccess={onSuccess}
                                      onFailure={onFailure}
                                      cookiePolicy={"single_host_origin"}
                                      isSignedIn={false}
                                      icon="fa-google"
                                      render={(renderProps) => (
                                        <button
                                          style={{
                                            marginTop: "3%",
                                            marginBottom: "3%",
                                          }}
                                          className="DiveBtn _custom_login_btn"
                                          onClick={renderProps.onClick}
                                          disabled={renderProps.disabled}
                                        >
                                          LOGIN WITH GOOGLE
                                        </button>
                                      )}
                                    />

                                   
                                  </div>
                                </div>
                              </form>
                              {/* <div className='LogAnother DBlock'>
                                <p>or log in with</p>
                                <ul className='LogUl DFlex justify-content-center'>
                                  <li>
                                    <Link to='#!'>
                                      <img src='/assets/svg/Facebook.svg' alt='' />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to='#!'>
                                      <img src='/assets/svg/Google.svg' alt='' />
                                    </Link>
                                  </li>
                                </ul>
                              </div> */}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </li>
                  </Fragment>
                )}
              </ul>
              {/* <div className='dropdown CountryDrop text-center'>
                <a
                  className='dropdown-toggle'
                  href='#'
                  role='button'
                  id='dropdownMenuLink'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <img src={`/assets/svg/${countryImage === 'CA' ? 'Canada' : countryImage === 'IN' ? 'India' : 'UAE'}.svg`} alt='' />
                </a>

                <div className='dropdown-menu MinWidthCountry' aria-labelledby='dropdownMenuLink'>
                  <h3>Location</h3>
                  <button className='dropdown-item HoverCountry' onClick={() => setCountryImage('UAE')}>
                    <img src='/assets/svg/UAE.svg' alt='UAE' /> United Arab Emirates
                  </button>
                  <button className='dropdown-item HoverCountry' onClick={() => setCountryImage('CA')}>
                    <img src='/assets/svg/Canada.svg' alt='Canada' /> Canada
                  </button>
                  <button className='dropdown-item HoverCountry' onClick={() => setCountryImage('IN')}>
                    <img src='/assets/svg/India.svg' alt='India' /> India
                  </button>
                </div>
              </div> */}
            </div>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

export default React.memo(Header);
