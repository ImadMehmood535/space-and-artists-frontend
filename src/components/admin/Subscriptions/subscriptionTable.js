import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';

const UsersTable = () => {
  const [usersData, setUsersData] = useState(null);
  const [tableUsers, setTableUsers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`user/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllUsers(0);
        notificationSuccess('Delete Account', 'User has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete Account', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      notificationError('Delete Account', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDelId(null);
  };

  const editClick = (id) => {};

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllUsers = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`payments/all` , { headers: headers.simple });
      console.log('getting the users' , res);
      if (res.status === 200) {
        let tableData = [];
        res.data.map((item, i) => {
          tableData[i] = {
            transactionId: item.transactionId,
            name: item.firstname + ' ' + item.lastname,
            email: item.email,
            phone : item.phone,
            whatsapp : item.whatsapp,
            subscriptionDate : item.subscriptionDate,
            endDate : item.endDate,
            planDuration : item.planDuration + " Month",
            plan :'AED ' + item.planPrice,
            status : item.statusSubscribe
          };
        });
        setLoading(false);
        setTableUsers(tableData);
        setUsersData(res.data);
      }
    } catch (error) {
      notificationError('Artists', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllUsers(0);
  }, []);

  return (
    <Fragment>
      {usersData ? (
        <Fragment>
          <Loader loader={loading} position={true} />
          <h2>Users Subscriptions</h2>
          <ReactTable
            cols={cols}
            // getPageData={tableUsers}
            data={tableUsers}
            // defaultPageSize={limit}
            // pageCount={usersData.pagination.totalPage}
            // canPreviousPage={usersData.pagination.previous}
            // canNextPage={usersData.pagination.next}
            // previousPage={() => getAllUsers(usersData.pagination.current - 1)}
            // nextPage={() => getAllUsers(usersData.pagination.current + 1)}
            // gotoPage={getAllUsers}
          />
        </Fragment>
      ) : null}
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Delete User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' className='text-center'>
            Are you sure you want to delete the user.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-secondary' onClick={handleClose}>
            Cancel
          </button>
          <button type='button' className='btn btn-outline-danger' onClick={handleDelete} color='primary' autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog> */}
    </Fragment>
  );
};

export default UsersTable;

const cols = [
  {
    Header: 'Transaction Id',
    accessor: 'transactionId',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Whatsapp',
    accessor: 'whatsapp',
  },
  {
    Header: 'subscription Date',
    accessor: 'subscriptionDate',
  },
  {
    Header: 'Expirty Date',
    accessor: 'endDate',
  },
  {
    Header: 'Plan Duration',
    accessor: 'planDuration',
  },
  {
    Header: 'Plan Price',
    accessor: 'plan',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
