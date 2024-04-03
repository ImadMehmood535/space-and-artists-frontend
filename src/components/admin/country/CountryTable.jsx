import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess, validateValue } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';
import AddCountryDialog from './AddCountryDialog';
import UpdateCountryDialog from './UpdateCountryDialog';
import DeleteCountryDialog from './DeleteCountryDialog';

const CountryTable = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [values, setValues] = React.useState({ id: null, name: '' });

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`country/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllCountries(0);
        notificationSuccess('Delete Country', 'User has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete Country', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      notificationError('Delete Country', error);
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
    setValues({ id: null, name: '' });
  };

  const handleUpdateClose = () => {
    setEditId(null);
    setUpdateOpen(false);
    setValues({ id: null, name: '' });
  };

  const editClick = (id) => {
    setEditId(id);
    getCountryById(id);
  };

  const getCountryById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`country/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setValues({ id: res.data[0].id, name: res.data[0].name });
        setUpdateOpen(true);
      }
    } catch (error) {
      setLoading(false);
      notificationError('Country', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validateValue(values.name) === true) {
      let data = { name: values.name };
      try {
        const res = await axios.post('country', data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
        if (res.status === 200) {
          setAddOpen(false);
          setLoading(false);
          getAllCountries(0);
          setValues({ id: null, name: '' });
          notificationSuccess('Country', 'Country added successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('Country', error);
      }
    } else {
      setLoading(false);
      notificationError('Country', 'Country name required!');
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (validateValue(values.name) === true) {
      let data = { name: values.name };
      try {
        const res = await axios.put(`country/${editId}`, data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
        if (res.status === 201) {
          setUpdateOpen(false);
          setLoading(false);
          getAllCountries(0);
          setValues({ id: null, name: '' });
          notificationSuccess('Country', 'Country updated successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('Country', error);
      }
    } else {
      setLoading(false);
      notificationError('Country', 'Country name required!');
    }
  };

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllCountries = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`country/pagination?limit=${limit}&page=${page}`, { headers: headers.simple });
      if (res.status === 200) {
        let tableData = [];
        res.data.result.map((item, i) => {
          tableData[i] = {
            id: i + 1,
            name: item.name,
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
        setAllCountries(res.data);
        notificationSuccess('Country', 'Country loaded successfully!');
      }
    } catch (error) {
      notificationError('Country', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllCountries(0);
  }, []);

  return (
    <Fragment>
      {allCountries ? (
        <Fragment>
          <div className='UserTableDiv DBlock'>
            <Loader loader={loading} position={true} />
            <div className='TableTitle DFlex'>
              <h2>Country Table</h2>
              <button onClick={() => setAddOpen(true)} className='AddBtn'>
                Add Country
              </button>
            </div>
            <ReactTable
              cols={cols}
              getPageData={tableData}
              data={tableData}
              defaultPageSize={limit}
              pageCount={allCountries.pagination.totalPage}
              canPreviousPage={allCountries.pagination.previous}
              canNextPage={allCountries.pagination.next}
              previousPage={() => getAllCountries(allCountries.pagination.current - 1)}
              nextPage={() => getAllCountries(allCountries.pagination.current + 1)}
              gotoPage={getAllCountries}
            />
          </div>
        </Fragment>
      ) : null}
      <AddCountryDialog
        name={values.name}
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <UpdateCountryDialog
        name={values.name}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
      <DeleteCountryDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default CountryTable;

const cols = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Country Name',
    accessor: 'name',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
