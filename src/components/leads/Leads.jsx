import React, { PureComponent, Fragment } from "react";
import LeadsFilterForm from "./LeadsFilterForm";
import LeadsTab from "./LeadsTab";
import LeadsProfile from "./LeadsProfile";
// import Pagination from 'react-js-pagination';
import {
  baseUrl,
  headers,
  notificationError,
  validateValue,
} from "../../common/constants";
import axios from "axios";
import Loader from "../../common/Loader";

class Leads extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      activePage: 10,
      location: "",
      country: [],
      filterArtists: [],
      subCategory: [],
      parentCategory: [],
      filterSubCategory: [],
      filterParentCategory: [],
      category: [],
      allArtists: [],
      artists: [],
      singleArtists: null,
      searchVal: "",
    };
  }

  handleLocation = (val) => {
    this.setState({
      ...this.state,
      location: val,
    });
  };

  handleTab = (e, id) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      singleArtists: this.state.artists.find((item) => item.id === id),
    });
  };

  shuffleLeads = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // Leads Tabs Apis
  getAllArtists = async () => {
    try {
      const res = await axios.get("users-all", { headers: headers.simple });
      if (res.status === 200) {
        debugger;
        let data = this.shuffleLeads(res.data);
        this.setState({
          ...this.state,
          allArtists: data,
          artists: data,
          singleArtists: data[0],
          loader: false,
        });
      }
    } catch (error) {
      this.setState(
        {
          loader: false,
        },
        () => {
          notificationError(
            "Artists",
            "Something went wrong. Please try again!"
          );
        }
      );
    }
  };

  getAllArtistsById = async (id) => {
    this.setState({
      ...this.state,
      loader: true,
    });
    try {
      const res = await axios.get(`user-category/${id}`, {
        headers: headers.simple,
      });
      if (res.status === 200) {
        this.setState(
          {
            ...this.state,
            allArtists: res.data,
            artists: res.data,
            singleArtists: res.data[0],
            loader: false,
          },
          () => {
            this.getAllCategoriesByParent(id);
          }
        );
      }
    } catch (error) {
      this.setState(
        {
          loader: false,
        },
        () => {
          notificationError("Artists", "Artist Not Found!");
        }
      );
    }
  };

  // Leads Form APi's
  getAllCategories = async () => {
    try {
      const res = await axios.get(`category/no-parent`, {
        headers: headers.simple,
      });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          category: res.data,
          subCategory: res.data,
        });
      }
    } catch (error) {
      notificationError("Categories", "Something went wrong. Please try again");
    }
  };

  getAllParentCategories = async () => {
    try {
      const res = await axios.get("category/all", { headers: headers.simple });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          parentCategory: res.data,
        });
      }
    } catch (error) {
      notificationError("Categories", "Something went wrong. Please try again");
    }
  };

  getAllCategoriesByParent = async (id) => {
    try {
      const res = await axios.get(`category/child/${id}`, {
        headers: headers.simple,
      });
      if (res.status === 200) {
        this.setState({
          ...this.state,
          category: res.data,
        });
      }
    } catch (error) {
      notificationError("Categories", "Something went wrong. Please try again");
    }
  };

  handleCategory = (e) => {
    let artists = [...this.state.artists];
    let newArtists = artists.filter(
      (list) => list.categoryId == e.target.value
    );
    if (e.target.value) {
      this.setState({
        ...this.state,
        artists: newArtists,
        singleArtists: newArtists[0],
      });
    } else {
      this.setState({
        ...this.state,
        artists: this.state.allArtists,
        singleArtists: this.state.allArtists[0],
      });
    }
  };

  handleLocation = (e) => {
    let artists = [...this.state.artists];
    let newArtists = artists.filter((list) => list.countryId == e.target.value);
    if (e.target.value) {
      this.setState({
        ...this.state,
        artists: newArtists,
        singleArtists: newArtists[0],
      });
    } else {
      this.setState({
        ...this.state,
        artists: this.state.allArtists,
        singleArtists: this.state.allArtists[0],
      });
    }
  };

  handleParentCategorySearch = (value) => {
    let filterArt = this.state.parentCategory.filter((item) =>
      item.category_name.toLowerCase().includes(value.toLowerCase())
    );
    if (validateValue(value)) {
      this.setState(
        {
          ...this.state,
          filterParentCategory: filterArt,
        },
        () => {
          this.handleSubCategorySearch(value);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          filterParentCategory: null,
        },
        () => {
          this.handleSubCategorySearch(value);
        }
      );
    }
  };

  handleSubCategorySearch = (value) => {
    let filterArt = this.state.subCategory.filter((item) =>
      item.category_name.toLowerCase().includes(value.toLowerCase())
    );
    if (validateValue(value)) {
      this.setState(
        {
          ...this.state,
          filterSubCategory: filterArt,
        },
        () => {
          this.handleNameSearch(value);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          filterSubCategory: null,
        },
        () => {
          this.handleNameSearch(value);
        }
      );
    }
  };

  handleNameSearch = (value) => {
    let filterArt = this.state.allArtists.filter(
      (item) =>
        item.firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(value.toLowerCase())
    );
    if (validateValue(value)) {
      this.setState({
        ...this.state,
        filterArtists: filterArt,
      });
    } else {
      this.setState({
        ...this.state,
        filterArtists: null,
      });
    }
  };

  handleFilterArtistsCategory = (id, name) => {
    let filterArt = this.state.allArtists.filter(
      (item) => item.categoryParentId === id
    );
    this.setState({
      ...this.state,
      searchVal: name,
      filterSubCategory: [],
      filterParentCategory: [],
      filterArtists: [],
      artists: filterArt ? filterArt : null,
    });
  };

  handleFilterArtistsSubCategory = (id, name) => {
    let filterArt = this.state.allArtists.filter(
      (item) => item.categoryId === id
    );
    this.setState({
      ...this.state,
      searchVal: name,
      filterSubCategory: [],
      filterParentCategory: [],
      filterArtists: [],
      artists: filterArt ? filterArt : null,
    });
  };

  handleFilterArtistsName = (id, name) => {
    console.log(name);
    let filterArt = this.state.allArtists.filter((item) => item.id === id);
    this.setState({
      ...this.state,
      searchVal: name,
      filterSubCategory: [],
      filterParentCategory: [],
      filterArtists: [],
      artists: filterArt ? filterArt : null,
    });
  };

  handleSubmitSearch = (e) => {
    e.preventDefault();
    let value = this.state.searchVal.toLowerCase();
    let filterArt = this.state.allArtists.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes(value) ||
        item.categoryParentName?.toLowerCase().includes(value) ||
        item.firstName?.toLowerCase().includes(value) ||
        item.lastName?.toLowerCase().includes(value)
    );
    if (validateValue(value)) {
      this.setState({
        ...this.state,
        artists: filterArt,
        singleArtists: null,
        filterSubCategory: [],
        filterParentCategory: [],
        filterArtists: [],
        searchVal: value,
      });
    } else {
      this.setState({
        ...this.state,
        artists: this.state.allArtists,
        singleArtists: null,
        filterSubCategory: [],
        filterParentCategory: [],
        filterArtists: [],
        searchVal: value,
      });
    }
  };

  handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    this.setState(
      {
        ...this.state,
        searchVal: e.target.value,
      },
      () => {
        let filterArt = this.state.allArtists.filter(
          (item) =>
            item.categoryName?.toLowerCase().includes(value) ||
            item.categoryParentName?.toLowerCase().includes(value) ||
            item.firstName?.toLowerCase().includes(value) ||
            item.lastName?.toLowerCase().includes(value)
        );
        if (validateValue(value)) {
          this.setState(
            {
              ...this.state,
              artists: filterArt,
              singleArtists: null,
              searchVal: value,
            },
            () => {
              this.handleParentCategorySearch(value);
            }
          );
        } else {
          this.setState(
            {
              ...this.state,
              artists: this.state.allArtists,
              singleArtists: null,
              searchVal: value,
            },
            () => {
              this.handleParentCategorySearch(value);
            }
          );
        }
      }
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.params.id) {
        this.getAllArtistsById(this.props.match.params.id);
        this.getAllParentCategories();
      } else {
        this.getAllParentCategories();
        this.getAllArtists();
        this.getAllCategories();
      }
    }
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let id = this.props.match.params.id;
    if (id) {
      this.getAllArtistsById(id);
      this.getAllParentCategories();
    } else {
      console.log("Without");
      this.getAllParentCategories();
      this.getAllArtists();
      this.getAllCategories();
    }
  }

  render() {
    return (
      <Fragment>
        <section className="LeadsSec DBlock">
          <div className="container">
            <div className="LeadsOuterDiv DBlock">
              <LeadsFilterForm
                handleCategory={this.handleCategory}
                handleLocation={this.handleLocation}
                handleSearch={this.handleSearch}
                handleSubmitSearch={this.handleSubmitSearch}
                handleFilterArtistsCategory={this.handleFilterArtistsCategory}
                handleFilterArtistsSubCategory={
                  this.handleFilterArtistsSubCategory
                }
                handleFilterArtistsName={this.handleFilterArtistsName}
                searchVal={this.state.searchVal}
                category={this.state.category}
                parentCategory={this.state.filterParentCategory}
                filterArtists={this.state.filterArtists}
                subCategory={this.state.filterSubCategory}
              />
              {this.state.loader ? (
                <Loader loader={this.state.loader} />
              ) : (
                <Fragment>
                  <div className="Title DBlock h-auto">
                    <h3>Let’s Get it Done</h3>
                  </div>
                  <div className="row" style={{ display: "block" }}>
                    <div className="col col-lg-12" style={{ display: "flex" }}>
                      <LeadsTab
                        id={
                          this.state.singleArtists
                            ? this.state.singleArtists.id
                            : null
                        }
                        artists={this.state.artists}
                        handleTab={this.handleTab}
                      />
                      <LeadsProfile singleArtists={this.state.singleArtists} />
                    </div>
                  </div>
                  {/* <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                  /> */}
                </Fragment>
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Leads;
