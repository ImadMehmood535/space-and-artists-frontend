import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess } from '../../common/admin/constants';
import { ReactTable } from '../../common/admin/ReactTable';
import Loader from '../../common/Loader';
import { useHistory } from "react-router-dom";


const UsersTable = () => {
  const [usersData, setUsersData] = useState(null);
  const [tableUsers, setTableUsers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);


  const [verifyStatus , setVerifyStatus] = useState(null);
  const [olderSubsription , setOlderSubscription] = useState('');

  const history = useHistory();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`user/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('token') },
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
    let email = localStorage.getItem('user_email');
    setLoading(true);
    try {
      const res = await axios.post(`/payments/getPayments/${email}`);
      console.log('getting the users' , res);
      if (res.status === 200) {
        let tableData = [];
        res.data.map((item, i) => {
          tableData[i] = {
            transactionId: item.transactionId,
            // name: item.firstname + ' ' + item.lastname,
            // email: item.email,
            // phone : item.phone,
            // whatsapp : item.whatsapp,
            subscriptionDate : item.subscriptionDate,
            endDate : item.endDate,
            planDuration : item.planDuration + " Month",
            plan :'AED ' + item.planPrice,
            status : item.statusSubscribe
          };
        });
        res.data.map(x => {
          if(x['statusSubscribe'] === 'Active'){
            setVerifyStatus(x.statusSubscribe);
            console.log('getting the status' , x);
          }
        })
        setLoading(false);
        setTableUsers(tableData);
        setUsersData(res.data);
        console.log('getting the status' , verifyStatus);
      }
    } catch (error) {
      setLoading(false);
      notificationError('Subscription', 'Please Renew your subscription');
    }
  };


  // const verifySubscribe = async () => {
  //   let email = localStorage.getItem('user_email');
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(`/payments/getPayments/${email}`);
  //     console.log('getting the users' , res);
  //     if (res.status === 200) {
  //       let tableData = [];
  //       res.data.map((item, i) => {
  //         tableData[i] = {
  //           transactionId: item.transactionId,
  //           // name: item.firstname + ' ' + item.lastname,
  //           // email: item.email,
  //           // phone : item.phone,
  //           // whatsapp : item.whatsapp,
  //           subscriptionDate : item.subscriptionDate,
  //           endDate : item.endDate,
  //           planDuration : item.planDuration + " Month",
  //           plan :'AED ' + item.planPrice,
  //           status : item.statusSubscribe
  //         };
  //       });
  //       // setVerifyStatus(res.data[);
  //       setLoading(false);
  //       setTableUsers(tableData);
  //       setUsersData(res.data);
  //     }
  //   } catch (error) {
  //     notificationError('Artists', 'Something went wrong. Please try again!');
  //   }
  // }

  const renewSubscription = () => {
    history.push('/payment1');
    // alert('dad');
  }

  useEffect(() => {
    getAllUsers(0);
  }, []);
  return (
    <>
    {/* <Fragment> */}
        <Fragment>
          <Loader loader={loading} position={true} />
          <h2 style={{marginTop : '20px' , textAlign : 'center'}}>My Subscriptions</h2>
          <ReactTable
            cols={cols}
            data={tableUsers}
            defaultPageSize={50}
          />
        </Fragment>

      {verifyStatus !== 'Active'  ? (
      <div style={{textAlign : 'center' , marginBottom : '20px'}}>
        <h3 style={{color: "red"}}>Your subscription seems to be expired.</h3>
         <p>Please renew your subscription plan by clicking below</p>
       <button onClick={renewSubscription} style={{border:'none',padding:'11px 23px',cursor : 'pointer' , color : '#fff' , background : '#110a0ab5' ,borderRadius:'20px'}}>Renew Subscriptions</button>
        
      </div>
     ) : null
      }
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
    {/* </Fragment> */}
    </>
  );
};

export default UsersTable;

const cols = [
  {
    Header: 'Transaction Id',
    accessor: 'transactionId',
  },
  // {
  //   Header: 'Name',
  //   accessor: 'name',
  // },
  // {
  //   Header: 'Email',
  //   accessor: 'email',
  // },
  // {
  //   Header: 'Phone',
  //   accessor: 'phone',
  // },
  // {
  //   Header: 'Whatsapp',
  //   accessor: 'whatsapp',
  // },
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
    Header : 'Status',
    accessor : 'status'
  }
];
