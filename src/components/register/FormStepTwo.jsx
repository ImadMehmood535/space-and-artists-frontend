import React, { Fragment, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import {
  notificationError,
  validFacebook,
  validInstagram,
  validLinkedIn,
  validWebsite,
  validYoutube,
} from "../../common/constants";
import { headers, baseUrl } from "./../../common/constants";
import CropProfileImage from "./CropProfileImage";
import Loader from "../../common/Loader";
import { KeyboardDatePicker } from "@material-ui/pickers";

const FormStepTwo = (props) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleDate = (date) => {
    const modifiedDate = new Date(date).toISOString().slice(0, 10);
    const formateDate = `${modifiedDate.split("-")[0]}-${
      modifiedDate.split("-")[1]
    }-${modifiedDate.split("-")[2]}`;
    props.setDate(formateDate);
  };

  useEffect(() => {
    getCountries();
    getCategories();
  }, []);

  return (
    <Fragment>
      <form action="" className="form OtherForm" autoComplete="off">
        <div className="form-row">
          <Loader loader={loading} absolute={true} />
          <div className="col-md-6 mb-3">
            <select
              className="CusSelect"
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
          </div>

          <div className="col-md-6 mb-3">
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
          </div>
          <div className="col-md-6 mb-3">
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
          </div>
          <div
            className="col-md-6 mb-3"
            style={{
              marginTop: "0.9%",
            }}
          >
            <PhoneInput
              placeholder="Phone Number"
              value={props.form.phone}
              name="phone"
              onChange={(val) => props.handlePhone(val)}
            />
          </div>
          <div className="col-12">
            <textarea
              name="description"
              value={props.form.description}
              placeholder="About Yourself"
              onChange={(e) => props.handleState(e)}
            ></textarea>
          </div>
          {/* <div className="col-md-6 mb-3">
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
          </div> */}
          {/* <div className="col-md-6 mb-3">
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
          </div> */}
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <input
              type="text"
              onChange={(e) => props.handleState(e)}
              onBlur={(e) => validLinkedIn(e.target.value)}
              value={props.form.linkedin}
              placeholder="LinkedIn link"
              name="linkedin"
            />
            <label style={{ color: "gray" }}>
              e.g. https://www.linkedin.com/in/john
            </label>
          </div>
          {/* <div className="col-md-6 mb-3">
            <PhoneInput
              placeholder="Whatsapp Number*"
              name="whatsapp"
              value={props.form.whatsapp}
              onChange={(val) => props.handleWhatsApp(val)}
            />
          </div> */}
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <input
              type="text"
              onChange={(e) => props.handleState(e)}
              value={props.form.facebook}
              placeholder="Facebook Link"
              onBlur={(e) => validFacebook(e.target.value)}
              name="facebook"
            />
            <label style={{ color: "gray" }}>
              e.g. https://www.facebook.com/john
            </label>
          </div>
          {/* <div className="col-md-6 mb-3">
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
          </div> */}
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <input
              type="text"
              value={props.form.youtube}
              onChange={(e) => props.handleState(e)}
              onBlur={(e) => validYoutube(e.target.value)}
              placeholder="Youtube Video Link"
              name="youtube"
            />
            <label style={{ color: "gray" }}>
              e.g. https://www.youtube.com/watch?v=C0DPdy98e4c
            </label>
          </div>
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <input
              type="text"
              onChange={(e) => props.handleState(e)}
              value={props.form.instagram}
              placeholder="Instagram Username"
              onBlur={(e) => props.handleInstagram(e.target.value)}
              name="instagram"
            />
            <label style={{ color: "gray" }}>e.g. @username</label>
          </div>
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <input
              type="text"
              onChange={(e) => props.handleState(e)}
              value={props.form.website}
              placeholder="Website Link"
              onBlur={(e) => validWebsite(e.target.value)}
              name="website"
            />
            <label style={{ color: "gray" }}>
              e.g. https://www.example.com
            </label>
          </div>
          <div className="col-md-6 mb-3" style={{ marginTop: "2%" }}>
            <button
              className="Overlay DFlex"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalCover"
            >
              <span>
                {props.form.coverPicture !== ""
                  ? props.form.coverPicture[0].name
                  : "Upload Cover Picture"}
              </span>
              <button type="button">UPLOAD</button>
            </button>
          </div>
        </div>
        <div className="NextBtn DFlex justify-content-end my-5">
          <button
            type="button"
            className="AccountBtn SubmitBtn"
            onClick={() => props.handleSteps("StepOne")}
          >
            Previous
          </button>
          <button
            type="button"
            className="AccountBtn SubmitBtn"
            onClick={() => props.handleSubmit()}
          >
            Submit
          </button>
        </div>
      </form>
      {/* <div
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
      </div> */}
      <div
        className="modal fade CropModal"
        id="exampleModalCover"
        tabIndex="-1"
        aria-labelledby="exampleModalCoverLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h5 className="modal-title" id="exampleModalCoverLabel">
                Cover Image
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
                aspect={16 / 7}
                fileName="CoverImage.png"
                handleImage={props.handleCoverImage}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormStepTwo;
