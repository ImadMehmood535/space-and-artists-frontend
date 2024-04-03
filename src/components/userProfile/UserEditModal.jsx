import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import PhoneInput from "react-phone-number-input";
import InputFiles from "react-input-files";
import {
  notificationError,
  notificationSuccess,
  baseUrl,
  headers,
  validLinkedIn,
  validFacebook,
  validInstagram,
  validWebsite,
} from "./../../common/constants";
import axios from "axios";
import $ from "jquery";
import Loader from "./../../common/Loader";
import CropUserProfileImage from "./CropUserProfileImage";

const UserEditModal = ({ getUserByToken }) => {
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    countryId: "",
    cityId: "",
    role: "",
    description: "",
    categoryId: "",
    linkedin: "",
    whatsapp: "",
    youtube: "",
    website: "",
    instagram: "",
    facebook: "",
    changePassword: "",
    profilePicture: "",
    coverPicture: "",
  });

  const handleState = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhone = (value) => {
    setValues({
      ...values,
      phone: value,
    });
  };

  const handleInstagram = (value) => {
    if (value !== "" && value !== null && value !== "null") {
      let instagram = `https://www.instagram.com/${value}`;
      setValues({
        ...values,
        instagram,
      });
    }
  };

  const handleWhatsApp = (value) => {
    setValues({
      ...values,
      whatsapp: value,
    });
  };

  const handleProfileImage = (value) => {
    setValues({
      ...values,
      profilePicture: value,
    });
  };

  const handleCoverImage = (value) => {
    setValues({
      ...values,
      coverPicture: value,
    });
  };

  const getUserById = async (token) => {
    try {
      const res = await axios.get("user-token", {
        headers: {
          ...headers,
          authorization: token,
        },
      });
      if (res.status === 200) {
        setValues(res.data[0]);
        // notificationSuccess('User', 'User loaded successfully!');
      } else {
        notificationError("User", "Something went wrong. Please try again!");
      }
    } catch (error) {
      notificationError("User", "Something went wrong. Please try again!");
    }
  };

  const handleCountry = (e) => {
    getCities(e.target.value);
    handleState(e);
  };

  const handleSubCategory = (id) => {
    if (id) getAllSubCategories(id);
  };

  const getCountries = async () => {
    try {
      const res = await axios.get("country", { headers: headers.simple });
      if (res.status === 200) {
        setCountries(res.data);
      }
    } catch (error) {
      getCities([]);
      notificationError("Sign up", error);
    }
  };

  const getCities = async (id) => {
    try {
      const res = await axios.get(`city/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setCities(res.data);
      }
    } catch (error) {
      notificationError("Sign up", error);
    }
  };

  const updateUserSubmit = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", values.role);
    formData.append("dateOfBirth", values.dateOfBirth);
    formData.append("countryId", values.countryId);
    formData.append("cityId", values.cityId);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    formData.append("whatsapp", values.whatsapp);
    formData.append("youtube", values.youtube);
    if (values.changePassword)
      formData.append("password", values.changePassword);
    if (
      values.linkedin !== "" &&
      values.linkedin !== "null" &&
      values.linkedin !== null &&
      validLinkedIn(values.linkedin) == true
    )
      formData.append("linkedin", values.linkedin);
    if (
      values.facebook !== "" &&
      values.facebook !== "null" &&
      values.facebook !== null &&
      validFacebook(values.facebook) == true
    )
      formData.append("facebook", values.facebook);
    if (
      values.instagram !== "" &&
      values.instagram !== "null" &&
      values.instagram !== null &&
      validInstagram(values.instagram) == true
    )
      formData.append("instagram", values.instagram);
    if (
      values.website !== "" &&
      values.website !== "null" &&
      values.website !== null &&
      validWebsite(values.website) == true
    )
      formData.append("website", values.website);
    if (typeof values.profilePicture !== "string")
      formData.append(
        "profilePicture",
        typeof values.profilePicture !== "string"
          ? values.profilePicture[0]
          : ""
      );
    if (typeof values.coverPicture !== "string")
      formData.append(
        "coverPicture",
        typeof values.coverPicture !== "string" ? values.coverPicture[0] : ""
      );
    try {
      const res = await axios.put(`user/${id}`, formData, {
        headers: {
          ...headers.image,
          authorization: localStorage.getItem("token"),
        },
      });
      if (res.status === 201) {
        setValues(res.data[0]);
        setLoading(false);
        dispatch({ type: "LOAD_USER", payload: localStorage.getItem("token") });
        getUserByToken();
        getUserById(localStorage.getItem("token"));
        $("body").removeClass("modal-open");
        $("#staticBackdrop").removeClass("show");
        $("#staticBackdrop").attr("aria-hidden", "true");
        $("#staticBackdrop").attr("aria-modal", "false");
        $("#staticBackdrop").css("display", "none");
        $(".modal-backdrop").remove();
        notificationSuccess("Update User", "You info updated successfully!");
      } else {
        setLoading(false);
        notificationError("Update User", "Something wrong please try again!");
      }
    } catch (error) {
      setLoading(false);
      notificationError("Update User", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`category/all`, { headers: headers.simple });
      if (res.status === 200) {
        setSubCategory([]);
        setCategory(res.data);
      }
    } catch (error) {
      notificationError("Countries", "Something went wrong!");
    }
  };

  const getAllSubCategories = async (id) => {
    try {
      const res = await axios.get(`category/all/${id}`, {
        headers: headers.simple,
      });
      if (res.status === 200) {
        setSubCategory(res.data);
      }
    } catch (error) {
      notificationError("Cities", "Something went wrong!");
    }
  };

  useEffect(() => {
    getAllCategories();
    getCountries();
    if (localStorage.getItem("token"))
      getUserById(localStorage.getItem("token"));
  }, []);

  return (
    <Fragment>
      <div
        className="modal fade EditProfileModal"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {loading ? (
              <Loader loader={loading} />
            ) : (
              <Fragment>
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit Profile
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
                <div className="modal-body">
                  <div className="EditProfileModalDiv DBlock">
                    <form action="" className="row">
                      <div className="col-md-12">
                        <div className="ProfileImgDiv DBlock">
                          <div className="ImgDiv DBlock">
                            <button
                              type="button"
                              className="EditBtn"
                              data-toggle="modal"
                              data-target="#exampleEditModalProfile"
                            >
                              <i className="icon fas fa-pencil-alt"></i>
                            </button>
                            <img
                              src={
                                profileImage
                                  ? profileImage
                                  : values.profilePicture
                              }
                              alt={
                                Array.isArray(values.profilePicture)
                                  ? values.profilePicture[0].name
                                  : null
                              }
                              className=""
                            />
                          </div>
                          <div className="ImgCoverDiv DBlock">
                            <button
                              type="button"
                              className="EditBtn"
                              data-toggle="modal"
                              data-target="#exampleEditModalCover"
                            >
                              <i className="icon fas fa-pencil-alt"></i>
                            </button>
                            <img
                              src={
                                coverImage ? coverImage : values.coverPicture
                              }
                              alt={
                                Array.isArray(values.coverPicture)
                                  ? values.coverPicture[0].name
                                  : null
                              }
                              className=""
                            />
                          </div>
                        </div>
                        <div className="FormDiv DBlock">
                          <div className="form-row">
                            <div className="col-12 mb-3">
                              <label htmlFor="">Description*</label>
                              <textarea
                                name="description"
                                value={values.description}
                                onChange={(e) => handleState(e)}
                                placeholder="Describe who you are"
                              ></textarea>
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">First Name*</label>
                              <input
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={(e) => handleState(e)}
                                placeholder=""
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">Last Name*</label>
                              <input
                                type="text"
                                name="lastName"
                                onChange={(e) => handleState(e)}
                                value={values.lastName}
                              />
                            </div>

                            <div className="col-12 mb-3">
                              <label htmlFor="">Country*</label>
                              <select
                                name="countryId"
                                id="countryId"
                                onChange={(e) => handleCountry(e)}
                              >
                                <option value="">Choose your Country</option>
                                {countries &&
                                  countries.map((list, i) => (
                                    <option
                                      value={list.id}
                                      selected={
                                        values.countryId === list.id
                                          ? true
                                          : false
                                      }
                                    >
                                      {list.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            {cities.length > 0 ? (
                              <div className="col-12 mb-3">
                                <label htmlFor="">City*</label>
                                <select
                                  name="cityId"
                                  id="cityId"
                                  onChange={(e) => handleState(e)}
                                >
                                  <option value="">Choose your City</option>
                                  {cities &&
                                    cities.map((list, i) => (
                                      <option
                                        value={list.id}
                                        selected={
                                          values.countryId === list.id
                                            ? true
                                            : false
                                        }
                                      >
                                        {list.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="col-12 mb-3">
                              <label htmlFor="">Art-Category*</label>
                              <select
                                name=""
                                id=""
                                onChange={(e) =>
                                  handleSubCategory(e.target.value)
                                }
                              >
                                <option value="">Select Art-Category*</option>
                                {category &&
                                  category.map((list) => (
                                    <option value={list.id}>
                                      {list.category_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            {subCategory.length > 0 ? (
                              <div className="col-12 mb-3">
                                <label htmlFor="categoryId">
                                  Art-Subcategory*
                                </label>
                                <select
                                  name="categoryId"
                                  id="categoryId"
                                  onChange={(e) => handleState(e)}
                                >
                                  <option value="">
                                    Select Art-Subcategory*
                                  </option>
                                  {subCategory &&
                                    subCategory.map((list) => (
                                      <option
                                        value={list.id}
                                        selected={
                                          values.categoryId === list.id
                                            ? true
                                            : false
                                        }
                                      >
                                        {list.category_name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="col-12 mb-3">
                              <label htmlFor="">Phone*</label>
                              <PhoneInput
                                placeholder="Whatsapp Number*"
                                name="phone"
                                value={values.phone}
                                onChange={(val) => handlePhone(val)}
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="changePassword">
                                Enter new password
                              </label>
                              <div className="CPasswordDiv DBlock position-relative">
                                <input
                                  type={typePassword ? "password" : "text"}
                                  name="changePassword"
                                  id="changePassword"
                                  onChange={(e) => handleState(e)}
                                  placeholder="Enter new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setTypePassword(!typePassword)}
                                  className="DFlex justify-content-center PosIcon"
                                >
                                  <i className="fas fa-eye icon"></i>
                                </button>
                              </div>
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">Whatsapp*</label>
                              <PhoneInput
                                placeholder="Whatsapp Number*"
                                name="whatsapp"
                                value={
                                  values.whatsapp === "null"
                                    ? ""
                                    : values.whatsapp
                                }
                                onChange={(val) => handleWhatsApp(val)}
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">Facebook</label>
                              <input
                                type="text"
                                name="facebook"
                                onChange={(e) => handleState(e)}
                                onBlur={(e) => validFacebook(e.target.value)}
                                value={
                                  values.facebook === "null"
                                    ? ""
                                    : values.facebook
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">Instagram Username</label>
                              <input
                                type="text"
                                name="instagram"
                                onChange={(e) => handleState(e)}
                                onBlur={(e) => handleInstagram(e.target.value)}
                                value={
                                  values.instagram === "null"
                                    ? ""
                                    : values.instagram
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">LinkedIn</label>
                              <input
                                type="text"
                                name="linkedin"
                                onChange={(e) => handleState(e)}
                                onBlur={(e) => validLinkedIn(e.target.value)}
                                value={
                                  values.linkedin === "null"
                                    ? ""
                                    : values.linkedin
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">YouTube</label>
                              <input
                                type="text"
                                name="youtube"
                                onChange={(e) => handleState(e)}
                                onBlur={(e) => validWebsite(e.target.value)}
                                value={
                                  values.youtube === "null"
                                    ? ""
                                    : values.youtube
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label htmlFor="">Website</label>
                              <input
                                type="text"
                                name="website"
                                onChange={(e) => handleState(e)}
                                onBlur={(e) => validWebsite(e.target.value)}
                                value={
                                  values.website === "null"
                                    ? ""
                                    : values.website
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 d-flex justify-content-end">
                        <button
                          type="button"
                          className="FormSub"
                          onClick={(e) => updateUserSubmit(e, values.id)}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade CropModal"
        id="exampleEditModalProfile"
        tabIndex="-1"
        aria-labelledby="exampleEditModalProfileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h5 className="modal-title" id="exampleEditModalProfileLabel">
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
              <CropUserProfileImage
                handleDisplayImage={setProfileImage}
                aspect={9 / 9}
                fileName="UpdateProfileImage.png"
                handleImage={handleProfileImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade CropModal"
        id="exampleEditModalCover"
        tabIndex="-1"
        aria-labelledby="exampleEditModalCoverLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h5 className="modal-title" id="exampleEditModalCoverLabel">
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
              <CropUserProfileImage
                handleDisplayImage={setCoverImage}
                aspect={16 / 7}
                fileName="UpdateCoverImage.png"
                handleImage={handleCoverImage}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserEditModal;
