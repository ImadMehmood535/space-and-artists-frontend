import React, { Fragment, useContext } from "react";
import ReactWhatsapp from "react-whatsapp";
import {
  baseUrl,
  headers,
  notificationSuccess,
  notificationError,
} from "./../../common/constants";
import { UserContext } from "./../../App";
import axios from "axios";

const UserInfo = ({ user }) => {
  const { dispatch } = useContext(UserContext);
  const BG = {
    backgroundImage: "url(/assets/images/ProfileImgBg.png)",
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`user/${id}`, {
        headers: {
          ...headers.image,
          authorization: localStorage.getItem("token"),
        },
      });
      if (res.status === 204) {
        notificationSuccess(
          "Delete Account",
          "Your has been deleted successfully!"
        );
        setTimeout(() => {
          window.location.href = "/";
          dispatch({ type: "LOGOUT" });
        }, 1000);
      } else {
        notificationError(
          "Delete Account",
          "Something went wrong please try again!"
        );
      }
    } catch (error) {
      notificationError("Delete Account", error);
    }
  };

  return (
    <Fragment>
      <div className="ArtistInfoDiv DFlex">
        <div className="ArtistImgDiv DBlock">
          <div className="ImgDiv DBlock" style={BG}>
            <img src={user ? user.profilePicture : ""} alt="" className="" />
          </div>
          <div className="ReactText DBlock d-none d-md-flex h-auto">
            <p>Reach out to me:</p>
          </div>
          <ul className="ReactLinkUl DFlex d-none d-md-flex">
            {user &&
            user.whatsapp !== null &&
            user.whatsapp !== "null" &&
            user.whatsapp !== "" ? (
              <li>
                <ReactWhatsapp
                  number={user.whatsapp}
                  className="bg-transparent border-0"
                >
                  <a href="#!">
                    <i className="fab fa-whatsapp icon"></i>
                  </a>
                </ReactWhatsapp>
              </li>
            ) : null}
            {user &&
            user.facebook !== null &&
            user.facebook !== "null" &&
            user.facebook !== "" ? (
              <li>
                <a href={user.facebook} target="blank">
                  <i className="fab fa-facebook-f icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-facebook-f icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.instagram !== null &&
            user.instagram !== "null" &&
            user.instagram !== "" ? (
              <li>
                <a href={user.instagram} target="blank">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.linkedin !== null &&
            user.linkedin !== "null" &&
            user.linkedin !== "" ? (
              <li>
                <a href={user.linkedin} target="blank">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.website !== null &&
            user.website !== "null" &&
            user.website !== "" ? (
              <li>
                <a href={user.website} target="blank">
                  <i className="fas fa-globe icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fas fa-globe icon"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="ArtistTextDiv DBlock">
          <div className="EditIcon">
            <button
              type="button"
              className="EditBtn"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              <i className="icon fas fa-pencil-alt"></i>
            </button>
          </div>
          <div className="DelIcon">
            <button
              type="button"
              className="DelBtn"
              data-toggle="modal"
              data-target="#staticBackdropDel"
            >
              <i className="icon fas fa-minus"></i>
            </button>
          </div>
          <div className="Title DBlock">
            <h3>{user ? user.firstName + " " + user.lastName : "!#"}</h3>
            <p>
              {user ? user.cityName : "N/A"}, {user ? user.countryName : ""}
            </p>
          </div>
          <div className="Description DBlock">
            <div className="Description DFlex justify-content-start BB">
              <h5>{user.categoryParentName}</h5> <h6>{user.categoryName}</h6>
            </div>
            <b>Description:</b>
            <p>{user ? user.description : ""}</p>
          </div>
          <div className="ReactText DBlock d-flex d-md-none">
            <p>Reach out to me:</p>
          </div>
          <ul className="ReactLinkUl DFlex d-flex d-md-none">
            {user &&
            user.whatsapp !== null &&
            user.whatsapp !== "null" &&
            user.whatsapp !== "" ? (
              <li>
                <ReactWhatsapp
                  number={user.whatsapp}
                  className="bg-transparent border-0"
                >
                  <a href="#!">
                    <i className="fab fa-whatsapp icon"></i>
                  </a>
                </ReactWhatsapp>
              </li>
            ) : null}
            {user &&
            user.facebook !== null &&
            user.facebook !== "null" &&
            user.facebook !== "" ? (
              <li>
                <a href={user.facebook} target="blank">
                  <i className="fab fa-facebook-f icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-facebook-f icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.instagram !== null &&
            user.instagram !== "null" &&
            user.instagram !== "" ? (
              <li>
                <a href={user.instagram} target="blank">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.linkedin !== null &&
            user.linkedin !== "null" &&
            user.linkedin !== "" ? (
              <li>
                <a href={user.linkedin} target="blank">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            )}
            {user &&
            user.website !== null &&
            user.website !== "null" &&
            user.website !== "" ? (
              <li>
                <a href={user.website} target="blank">
                  <i className="fas fa-globe icon"></i>
                </a>
              </li>
            ) : (
              <li>
                <a href="#!" className="disabled">
                  <i className="fas fa-globe icon"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        className="modal fade DelModalModal"
        id="staticBackdropDel"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropDelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Delete Account
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
              <div className="DelModalText DBlock text-center">
                <p>
                  Are you sure you want to permanently delete this account. It
                  will not be recoverable
                </p>
                <div className="ModalBtnDiv DFlex justify-content-center">
                  <button
                    type="button"
                    className="btn CancelBtn"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn DelBtn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
