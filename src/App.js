import React, { Fragment, useReducer, useEffect } from "react";
import Main from "./components/Main";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//Styling Files Link
import "./App.scss";
// ant design css
import "antd/dist/antd.css";
// import '~video-react/dist/video-react.css';
import "react-notifications/lib/notifications.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-phone-number-input/style.css";
// import "react-flags-select/css/react-flags-select.css";
import "react-custom-flag-select/lib/react-custom-flag-select.min.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// axios.defaults.baseURL = "https://apiv1.spacenartists.com/v1/api/";
axios.defaults.baseURL = "https://squid-app-9efc8.ondigitalocean.app/v1/api/";
// new ids
// axios.defaults.baseURL = 'https://stg-api.spacenartists.com/v1/api/';
// axios.defaults.baseURL = "http://localhost:5200/v1/api/";

export const UserContext = React.createContext();

const initialState = {
  user: null,
  isLogin: false,
  admin: null,
  adminLogin: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isAdminLogin");
      localStorage.setItem("login", true);
      localStorage.setItem("token", action.payload[0].token);
      return { ...state, user: action.payload, isLogin: true };
    case "LOAD_USER":
      if (
        action.payload.token !== "" &&
        action.payload.token !== "undefined" &&
        action.payload.token !== null
      ) {
        return { ...state, user: action.payload.user, isLogin: true };
      } else {
        return initialState;
      }
    case "LOGOUT":
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      return initialState;
    case "ADMIN_LOGIN_SUCCESS":
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.setItem("adminToken", action.payload[0].token);
      localStorage.setItem("isAdminLogin", true);
      return { ...state, user: action.payload, adminLogin: true };
    case "ADMIN_LOGIN_FAIL":
      return { ...state, user: null, adminLogin: false };
    case "LOAD_USER":
      return { ...state, user: null, adminLogin: action.payload };
    case "ADMIN_LOGOUT_SUCCESS":
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isAdminLogin");
      return { ...state, user: null, adminLogin: false };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  console.log({ state });

  const getItem = () => {
    const isLogin = localStorage.getItem("isLogin");
    const token = localStorage.getItem("token");
    const user = { isLogin, token };
    dispatch({ type: "LOAD_USER", payload: user });
    let adminToken = localStorage.getItem("adminToken");
    if (adminToken) dispatch({ type: "LOAD_USER", payload: true });
  };


  
  useEffect(() => {
    getItem();
  }, []);

  return (
    <Fragment>
      <UserContext.Provider value={{ state, dispatch }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Main adminLogin={state.adminLogin} />
        </MuiPickersUtilsProvider>
        <NotificationContainer />
      </UserContext.Provider>
    </Fragment>
  );
}

export default React.memo(App);
