import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { DatePicker } from "@material-ui/pickers";
// import ReactFlagsSelect from "react-flags-select";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const FormStepOne = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [passwordType, setPasswordType] = useState(true);
  const [cPasswordType, setCPasswordType] = useState(true);

  const handleDate = (date) => {
    const modifiedDate = new Date(date).toISOString().slice(0, 10);
    const formateDate = `${modifiedDate.split("-")[0]}-${
      modifiedDate.split("-")[1]
    }-${modifiedDate.split("-")[2]}`;
    setSelectedDate(date);
    props.setDate(formateDate);
  };

  return (
    <Fragment>
      <form className="OtherForm form" noValidate autoComplete="off">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="first_name"
              value={props.form.first_name}
              placeholder="First Name*"
              onChange={(e) => props.handleState(e)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="last_name"
              value={props.form.last_name}
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
          <div className="col-md-6 mb-3">
            <PhoneInput
              placeholder="Phone Number*"
              value={props.form.phone}
              name="phone"
              onChange={(val) => props.handlePhone(val)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <div className="CheckPos">
              <DatePicker
                value={selectedDate}
                dateFormat="DD/MM/YYYY"
                id="datepicker"
                onChange={(date) => handleDate(date)}
              />
              <label htmlFor="datepicker" className="Date">
                <i className="fas fa-calendar-alt icon"></i>
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            {/* <ReactFlagsSelect
              className="CusSelect"
              name="country"
              onSelect={(val) => props.handleCountry(val)}
              searchPlaceholder="Search for a country"
            /> */}
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <input
              type={passwordType ? "password" : "text"}
              value={props.form.password}
              name="password"
              onChange={(e) => props.handleState(e)}
              placeholder="Password*"
            />
            <button
              className="Eye"
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
            className="AccountBtn SubmitBtn"
            onClick={() => props.handleSteps("StepTwo")}
          >
            Next
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default FormStepOne;
