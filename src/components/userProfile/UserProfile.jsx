import React, { Fragment, useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { headers, notificationError } from "../../common/constants";
import ProfileMain from "./ProfileMain";
import axios from "axios";
import Loader from "../../common/Loader";

const UserProfile = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  const getUserByToken = async () => {
    try {
      const res = await axios.get("user-token", {
        headers: {
          authorization: localStorage.getItem("token"),
          ...headers.simple,
        },
      });
      if (res.status === 200) {
        setUser(res.data[0]);
        setLoader(false);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } else {
      }
    } catch (error) {
      // notificationError('Profile', 'Something went wrong please try again!');
    }
  };

  useEffect(() => {
    setLogin(state.isLogin);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (login) getUserByToken();
  }, []);

  return (
    <Fragment>
      {login ? (
        loader ? (
          <Loader loader={loader} />
        ) : (
          <Fragment>
            <div className="ArtistHomeDiv DBlock">
              <div className="ArtistHomeText DBlock">
                <img src={user ? user.coverPicture : ""} alt="" />
              </div>
            </div>
            <ProfileMain getUserByToken={getUserByToken} user={user} />
          </Fragment>
        )
      ) : (
        <Redirect push to="/" />
      )}
    </Fragment>
  );
};

export default UserProfile;
