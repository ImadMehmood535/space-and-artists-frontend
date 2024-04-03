import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess, validateValue } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';
import AddCityDialog from './AddCityDialog';
import UpdateCityDialog from './UpdateCityDialog';
import DeleteCityDialog from './DeleteCityDialog';

const CityTable = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [allCities, setAllCities] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [values, setValues] = React.useState({ id: null, name: '', countryId: null });

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`city/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllCities(0);
        notificationSuccess('Delete City', 'User has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete City', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      notificationError('Delete City', error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDelId(null);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setValues({ id: null, name: '', countryId: null });
  };

  const handleUpdateClose = () => {
    setEditId(null);
    setUpdateOpen(false);
    setValues({ id: null, name: '', countryId: null });
  };

  const editClick = (id) => {
    setEditId(id);
    getCountryById(id);
  };

  const getCountryById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`city-id/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setValues({ id: res.data[0].id, name: res.data[0].name, countryId: res.data[0].country_id });
        setUpdateOpen(true);
      }
    } catch (error) {
      setLoading(false);
      notificationError('City', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validateValue(values.name) && validateValue(values.countryId) === true) {
      let data = { name: values.name, country_id: values.countryId.toString() };
      try {
        const res = await axios.post('city', data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
        if (res.status === 200) {
          setAddOpen(false);
          setLoading(false);
          getAllCities(0);
          setValues({ id: null, name: '', countryId: null });
          notificationSuccess('City', 'City added successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('City', error);
      }
    } else {
      setLoading(false);
      notificationError('City', 'City name & Country are required!');
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (validateValue(values.name) && validateValue(values.countryId) === true) {
      let data = { name: values.name, country_id: values.countryId.toString() };
      try {
        const res = await axios.put(`city/${editId}`, data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
        if (res.status === 201) {
          setUpdateOpen(false);
          setLoading(false);
          getAllCities(0);
          setValues({ id: null, name: '', countryId: null });
          notificationSuccess('City', 'City updated successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('City', error);
      }
    } else {
      setLoading(false);
      notificationError('City', 'City name & Country are required!');
    }
  };

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllCities = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`city/pagination?limit=${limit}&page=${page}`, { headers: headers.simple });
      if (res.status === 200) {
        let tableData = [];
        res.data.result.map((item, i) => {
          tableData[i] = {
            name: item.name,
            countryName: item.countryName,
            action: [
              <ListActions
                actionsData={[
                  {
                    title: 'Edit',
                    id: item.id,
                    onClick: editClick,
                    icon: 'icon fas fa-user-edit',
                  },
                  {
                    title: 'Delete',
                    id: item.id,
                    onClick: deleteClick,
                    icon: 'icon fas fa-trash-alt',
                  },
                ]}
              />,
            ],
          };
        });
        setLoading(false);
        setTableData(tableData);
        setAllCities(res.data);
        notificationSuccess('City', 'City loaded successfully!');
      }
    } catch (error) {
      notificationError('City', 'Something went wrong. Please try again!');
    }
  };

  const getAllCountries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('country', { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setAllCountries(res.data);
      }
    } catch (error) {
      notificationError('Counties', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllCities(0);
    getAllCountries();
  }, []);

  return (
    <Fragment>
      {allCities ? (
        <Fragment>
          <div className='UserTableDiv DBlock'>
            <Loader loader={loading} position={true} />
            <div className='TableTitle DFlex'>
              <h2>City Table</h2>
              <button onClick={() => setAddOpen(true)} className='AddBtn'>
                Add City
              </button>
            </div>
            <ReactTable
              cols={cols}
              getPageData={tableData}
              data={tableData}
              defaultPageSize={limit}
              pageCount={allCities.pagination.totalPage}
              canPreviousPage={allCities.pagination.previous}
              canNextPage={allCities.pagination.next}
              previousPage={() => getAllCities(allCities.pagination.current - 1)}
              nextPage={() => getAllCities(allCities.pagination.current + 1)}
              gotoPage={getAllCities}
            />
          </div>
        </Fragment>
      ) : null}
      <AddCityDialog
        name={values.name}
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        allCountries={allCountries}
        countryId={values.countryId}
      />
      <UpdateCityDialog
        name={values.name}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        allCountries={allCountries}
        countryId={values.countryId}
      />
      <DeleteCityDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default CityTable;

const cols = [
  {
    Header: 'City Name',
    accessor: 'name',
  },
  {
    Header: 'Country Name',
    accessor: 'countryName',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
