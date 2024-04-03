import React, { Component, Fragment } from "react";
import {
  baseUrl,
  headers,
  notificationError,
  notificationSuccess,
  validateValue,
  validFacebook,
  validLinkedIn,
  validYoutube,
  validWebsite,
  validateEmail,
  validInstagram,
} from "../../common/constants";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import Loader from "../../common/Loader";
import  { Redirect } from 'react-router-dom'

class SingUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStep: "StepOne",
      isSuccess: false,
      loading: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        dateOfBirth: "",
        cityId: "",
        countryId: "",
        role: "",
        description: "",
        categoryId: "",
        linkedin: "",
        whatsapp: "",
        youtube: "",
        website: "",
        facebook: "",
        instagram: "",
        profilePicture: "",
        coverPicture: "",
      },
    };
  }

  handleSteps = (value) => {
    this.setState({
      ...this.state,
      showStep: value,
    });
  };

  handleFirstSteps = (e) => {
    e.preventDefault();
    let check =
      validateValue(this.state.form.firstName) &&
      validateValue(this.state.form.lastName) &&
      validateValue(this.state.form.email) &&
      // validateValue(this.state.form.countryId) &&
      // validateValue(this.state.form.cityId) &&
      validateValue(this.state.form.password) &&
      validateValue(this.state.form.confirm_password);
    // validateValue(this.state.form.role);
    if (check === true) {
      if (validateEmail(this.state.form.email) === true) {
        if (this.state.form.password.length >= 6) {
          if (this.state.form.password === this.state.form.confirm_password) {
            this.setState({
              ...this.state,
              showStep: "StepTwo",
            });
          } else {
            notificationError("Sign up", "Password does not matched!");
          }
        } else {
          notificationError(
            "Sign up",
            "Password must be greater then 6 character!"
          );
        }
      } else {
        notificationError("Email", "Invalid email address!");
      }
    } else {
      notificationError("Sign up", "Please fill required fields!");
    }
  };

  handleState = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleDate = (date) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        dateOfBirth: date,
      },
    });
  };

  handlePhone = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        phone: value,
      },
    });
  };

  handleWhatsApp = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        whatsapp: value,
      },
    });
  };

  handleInstagram = (value) => {
    if (value !== "" && value !== null && value !== "null") {
      let instagram;
      if (value.indexOf("instagram.com") == -1) {
        instagram = `https://www.instagram.com/${value}`;
      } else {
        instagram = `${value}`;
      }
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          instagram,
        },
      });
    }
  };

  handleCountry = (value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        country: value,
      },
    });
  };

  handleProfileImage = (value) => {
    if (value[0].size > 2097152) {
      alert("Maximum image allowed size is 2MB");
    } else {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          profilePicture: value,
        },
      });
    }
  };

  handleCoverImage = (value) => {
    if (value[0].size > 2097152) {
      alert("Maximum image allowed size is 2MB");
    } else {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          coverPicture: value,
        },
      });
    }
  };

  resetForm = () => {
    this.setState({
      ...this.state,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        dateOfBirth: "",
        country: "",
        role: "",
        description: "",
        categoryId: "",
        linkedin: "",
        whatsapp: "",
        youtube: "",
        website: "",
        facebook: "",
        instagram: "",
        profilePicture: "",
        coverPicture: "",
      },
    });
  };

  handleSubmit = async () => {
    this.setState({ ...this.state, loading: true });
    const val =
      // validateValue(this.state.form.phone) &&
      // validateValue(this.state.form.dateOfBirth) &&
      // validateValue(this.state.form.role) &&
      // validateValue(this.state.form.description) &&
      validateValue(this.state.form.firstName) &&
      validateValue(this.state.form.lastName) &&
      validateValue(this.state.form.categoryId) &&
      validateValue(this.state.form.whatsapp) &&
      validateValue(this.state.form.profilePicture);
    // && validateValue(this.state.form.coverPicture);
    // console.log("val: ", val, this.state);
    if (val === true) {
      console.log("val: ", val, this.state);
      // console.log('getting all the values' , this.state.form);

      const userInfo = {
        "email" : this.state.form.email,
        "phone" : this.state.form.phone,
        "whatsapp" : this.state.form.whatsapp,
        "firstname" : this.state.form.firstName,
        "lastname" : this.state.form.lastName
      }
      console.log('getting info from signup' , userInfo)
      localStorage.setItem('userInfo' , JSON.stringify(userInfo));

      // return;
      let formData = new FormData();
      formData.append("firstName", this.state.form.firstName);
      formData.append("lastName", this.state.form.lastName);
      formData.append("email", this.state.form.email);
      formData.append("password", this.state.form.password);
      formData.append("phone", this.state.form.phone);
      formData.append("role", "artist");
      formData.append("dateOfBirth", this.state.form.dateOfBirth);
      formData.append("countryId", this.state.form.countryId);
      formData.append("cityId", this.state.form.cityId);
      formData.append("description", this.state.form.description);
      formData.append("categoryId", this.state.form.categoryId);
      formData.append("whatsapp", this.state.form.whatsapp);
      formData.append("profilePicture", this.state.form.profilePicture[0]);
      formData.append("coverPicture", this.state.form.coverPicture[0]);
      formData.append("userStatus" , '0')
      if (
        this.state.form.youtube !== "" &&
        validYoutube(this.state.form.youtube) == true
      )
        formData.append("youtube", this.state.form.youtube);
      if (
        this.state.form.linkedin !== "" &&
        validLinkedIn(this.state.form.linkedin) == true
      )
        formData.append("linkedin", this.state.form.linkedin);
      if (
        this.state.form.facebook !== "" &&
        validFacebook(this.state.form.facebook) == true
      )
        formData.append("facebook", this.state.form.facebook);
      if (
        this.state.form.instagram !== "" &&
        validInstagram(this.state.form.instagram) == true
      )
        formData.append("instagram", this.state.form.instagram);
      if (
        this.state.form.website !== "" &&
        validWebsite(this.state.form.website) == true
      )
        formData.append("website", this.state.form.website);
      try {
        const res = await axios.post("sign-up", formData, {
          headers: headers.image,
        });
        if (res.status === 200) {
          this.setState(
            {
              ...this.state,
              loading: false,
              showStep: "Success",
            },
            () => {
              this.resetForm();
              // notificationSuccess(
              //   "Sign up",
              //   "You are registered successfully!"
              // );
              this.props.history.push('/payment1');
            }
          );
        } else {
          this.setState(
            {
              ...this.state,
              loading: false,
            },
            () => {
              notificationError("Sign up", "Something wrong please try again!");
            }
          );
        }
      } catch (error) {
        this.setState(
          {
            ...this.state,
            loading: false,
          },
          () => {
            notificationError("Sign up", error);
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
          notificationError("Sign up", "Please fill required fields!");
        }
      );
    }
  };

  render() {
    const { showStep } = this.state;
    return (
      <Fragment>
        <div className="AccountSec DBlock">
          <div className="container">
            {this.state.loading ? (
              <Loader loader={this.state.loading} />
            ) : (
              <div className="AccountOuterDiv DBlock">
                <div className="AccountPag DBlock">
                  <ul className="AccountPagUl DFlex justify-content-center">
                    <li
                      className={`AccountPagLink ${
                        showStep === "StepOne" ? "active" : ""
                      }`}
                    >
                      <span>1</span>
                    </li>
                    <li
                      className={`AccountPagLink ${
                        showStep === "StepTwo" ? "active" : ""
                      }`}
                    >
                      <span>2</span>
                    </li>
                    <li
                      className={`AccountPagLink ${
                        showStep === "Success" ? "active" : ""
                      }`}
                    >
                      <span>3</span>
                    </li>
                  </ul>
                </div>
                <SignUpForm
                  form={this.state.form}
                  steps={showStep}
                  setDate={this.handleDate}
                  handlePhone={this.handlePhone}
                  handleWhatsApp={this.handleWhatsApp}
                  handleCountry={this.handleCountry}
                  handleProfileImage={this.handleProfileImage}
                  handleCoverImage={this.handleCoverImage}
                  handleFirstSteps={this.handleFirstSteps}
                  handleSteps={this.handleSteps}
                  handleState={this.handleState}
                  handleSubmit={this.handleSubmit}
                  handleInstagram={this.handleInstagram}
                />
                {/* {this.state.isSuccess ? <ThanksMessage /> : ''} */}
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SingUp;
