import React, { Fragment, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { headers, notificationError } from "../../common/constants";
import axios from "axios";
import Loader from "../../common/Loader";
import CropProfileImage from "./CropProfileImage";

const FormStepOne = (props) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [passwordType, setPasswordType] = useState(true);
  const [cPasswordType, setCPasswordType] = useState(true);

  const handleDate = (date) => {
    const modifiedDate = new Date(date).toISOString().slice(0, 10);
    const formateDate = `${modifiedDate.split("-")[0]}-${
      modifiedDate.split("-")[1]
    }-${modifiedDate.split("-")[2]}`;
    props.setDate(formateDate);
  };

  const handleCountry = (e) => {
    setLoading(true);
    getCities(e.target.value);
    props.handleState(e);
  };

  const getCountries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("country", { headers: headers.simple });
      if (res.status === 200) {
        setCountries(res.data);
        setLoading(false);
        setCities([]);
      }
    } catch (error) {
      setCities([]);
      setLoading(false);
      notificationError("Sign up", error);
    }
  };

  const getCities = async (id) => {
    try {
      const res = await axios.get(`city/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setCities(res.data);
        setLoading(false);
      }
    } catch (error) {
      notificationError("Sign up", error);
    }
  };

  const handleSubcategory = (id) => {
    getSubCategories(id);
  };

  const getSubCategories = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`category/all/${id}`, {
        headers: headers.simple,
      });
      setSubCategory(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notificationError("Sub Categories", error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("category/all", { headers: headers.simple });
      setCategory(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notificationError("Categories", error);
    }
  };

  useEffect(() => {
    getCountries();
    getCategories();
  }, []);

  return (
    <Fragment>
      <form className="OtherForm form" autoComplete="off">
        <div className="row">
          <Loader loader={loading} absolute={true} />
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="firstName"
              value={props.form.firstName}
              placeholder="First Name*"
              onChange={(e) => props.handleState(e)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="lastName"
              value={props.form.lastName}
              onChange={(e) => props.handleState(e)}
              placeholder="Last Name*"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="email"
              name="email"
              value={props.form.email}
              onChange={(e) => props.handleState(e)}
              placeholder="Email ID*"
            />
          </div>
          {/* <div className="col-md-6 mb-3">
            <PhoneInput
              placeholder="Phone Number"
              value={props.form.phone}
              name="phone"
              onChange={(val) => props.handlePhone(val)}
            />
          </div> */}
          <div className="col-md-6 mb-3">
            <PhoneInput
              placeholder="Whatsapp Number*"
              name="whatsapp"
              value={props.form.whatsapp}
              onChange={(val) => props.handleWhatsApp(val)}
            />
          </div>
          {/* <div className="col-md-6 mb-3">
            <div className="CheckPos">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                placeholder="DD/MM/YYYY"
                value={selectedDate}
                onChange={setSelectedDate}
                onBlur={() => handleDate(selectedDate)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </div> */}
          <div className="col-md-6 mb-3">
            <select
              name="category_id"
              className="CusSelect"
              id="parent_category_id"
              onChange={(e) => handleSubcategory(e.target.value)}
            >
              <option value="">Select Art-Category*</option>
              {category &&
                category.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.category_name}
                  </option>
                ))}
            </select>
          </div>
          {/* <div className="col-md-6 mb-3">
            <select
              className="CusSelect"
              style={{ marginTop: "1.5%" }}
              name="countryId"
              id="countryId"
              onChange={(e) => handleCountry(e)}
            >
              <option value="">Country</option>
              {countries &&
                countries.map((list, i) => (
                  <option key={i} value={list.id}>
                    {list.name}
                  </option>
                ))}
            </select>
          </div> */}
          <div className="col-md-6 mb-3">
            <select
              name="categoryId"
              className="CusSelect"
              id="categoryId"
              onChange={(e) => props.handleState(e)}
            >
              <option value="">Select Art-Subcategory*</option>
              {subCategory &&
                subCategory.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.category_name}
                  </option>
                ))}
            </select>
          </div>
          {/* <div className="col-md-6 mb-3">
            <select
              className="CusSelect"
              name="cityId"
              id="cityId"
              onChange={(e) => props.handleState(e)}
            >
              <option value="">City</option>
              {cities &&
                cities.map((list, i) => (
                  <option key={i} value={list.id}>
                    {list.name}
                  </option>
                ))}
            </select>
          </div> */}

          <div className="col-md-6 mb-3 position-relative">
            <input
              type={passwordType ? "password" : "text"}
              value={props.form.password}
              name="password"
              onChange={(e) => props.handleState(e)}
              placeholder="Password*"
            />
            <button
              className="CheckPassword Eye"
              onClick={(e) => {
                e.preventDefault();
                setPasswordType(!passwordType);
              }}
            >
              <i className="fas fa-eye icon"></i>
            </button>
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <input
              type={cPasswordType ? "password" : "text"}
              value={props.form.confirm_password}
              name="confirm_password"
              onChange={(e) => props.handleState(e)}
              placeholder="Repeat Password*"
            />
            <button
              className="CheckPassword Eye"
              onClick={(e) => {
                e.preventDefault();
                setCPasswordType(!cPasswordType);
              }}
            >
              <i className="fas fa-eye icon"></i>
            </button>
          </div>

          <div className="col-md-6 mb-3">
            <button
              className="Overlay DFlex"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalProfile"
            >
              <span>
                {props.form.profilePicture !== ""
                  ? props.form.profilePicture[0].name
                  : "Upload Profile Picture*"}
              </span>
              <button type="button">UPLOAD</button>
            </button>
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <input
              type={"text"}
              value={props.form.referred_by}
              name="referred_by"
              onChange={(e) => props.handleState(e)}
              placeholder="Referred by:"
            />
          </div>
          {/* <div className='col-12 mb-5'>
            <FormControl component='fieldset' className='Role DFlex d-flex flex-row justify-content-center'>
              <FormLabel component='role'>Role</FormLabel>
              <RadioGroup className='flex-row' name='role' onChange={(e) => props.handleState(e)}>
                <FormControlLabel value='artist-and-client' control={<Radio />} label='Artist + Client' />
                <FormControlLabel value='client' control={<Radio />} label='Client' />
              </RadioGroup>
            </FormControl>
          </div> */}
        </div>
        <div className="NextBtn DFlex justify-content-end my-5">
          <button
            type="button"
            className="AccountBtn SubmitBtn"
            onClick={(e) => props.handleFirstSteps(e)}
          >
            Next
          </button>

          <div
            className="modal fade CropModal"
            id="exampleModalProfile"
            tabIndex="-1"
            aria-labelledby="exampleModalProfileLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header py-2">
                  <h5 className="modal-title" id="exampleModalProfileLabel">
                    Profile Image
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body p-0">
                  <CropProfileImage
                    aspect={9 / 9}
                    fileName="ProfileImage.png"
                    handleImage={props.handleProfileImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FormStepOne;
