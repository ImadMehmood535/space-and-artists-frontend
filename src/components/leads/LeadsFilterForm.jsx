import React, { Fragment, useState, useEffect } from "react";
import { headers, baseUrl, notificationError } from "./../../common/constants";
import axios from "axios";

const LeadsFilterForm = ({
  category,
  filterArtists,
  searchVal,
  subCategory,
  handleSubmitSearch,
  parentCategory,
  handleFilterArtistsCategory,
  handleFilterArtistsSubCategory,
  handleFilterArtistsName,
  handleSearch,
  handleCategory,
  handleLocation,
}) => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const res = await axios.get("country", { headers: headers.simple });
      if (res.status === 200) {
        setCountries(res.data);
      }
    } catch (error) {
      notificationError("Sign up", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Fragment>
      <div className="formDiv DFlex">
        <form
          className="form DFlex"
          style={{ width: "30%" }}
          onSubmit={(e) => handleSubmitSearch(e)}
        >
          <div className="DropSearchDiv DBlock">
            <ul className="SearchUl DBlock h-auto">
              {parentCategory &&
                parentCategory.map((list) => (
                  <li
                    key={list.id}
                    onClick={() =>
                      handleFilterArtistsCategory(list.id, list.category_name)
                    }
                  >
                    <strong>Category</strong>
                    {list.category_name}
                  </li>
                ))}
            </ul>
            <ul className="SearchUl DBlock h-auto">
              {subCategory &&
                subCategory.map((list) => (
                  <li
                    key={list.id}
                    onClick={() =>
                      handleFilterArtistsSubCategory(
                        list.id,
                        list.category_name
                      )
                    }
                  >
                    <strong>Sub-Category</strong>
                    {list.category_name}
                  </li>
                ))}
            </ul>
            <ul className="SearchUl DBlock h-auto">
              {filterArtists &&
                filterArtists.map((list) => (
                  <li
                    key={list.id}
                    onClick={() =>
                      handleFilterArtistsName(
                        list.id,
                        list.firstName + " " + list.lastName
                      )
                    }
                  >
                    <strong>Artists</strong>
                    {list.firstName + " " + list.lastName}
                  </li>
                ))}
            </ul>
          </div>
          <label className="d-none d-md-block">Search</label>
          <input
            type="text"
            name="Search"
            value={searchVal}
            placeholder="Search here..."
            onChange={(e) => handleSearch(e)}
            required=""
          />
          <button type="submit" className="SearchBtn">
            <i className="fas fa-search icon"></i>
          </button>
        </form>
        <div
          className="DFlex justify-content-end w-auto"
          style={{ flexFlow: "unset" }}
        >
          <select
            name="location"
            id="location"
            onChange={(e) => handleLocation(e)}
          >
            <option value="">Location</option>
            {countries &&
              countries.map((list, i) => (
                <option key={i} value={list.id}>
                  {list.name}
                </option>
              ))}
          </select>
          <select
            name="category"
            id="category"
            onChange={(e) => handleCategory(e)}
          >
            <option value="">Category</option>
            {category &&
              category.map((list, i) => (
                <option key={i} value={list.id}>
                  {list.category_name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default LeadsFilterForm;
