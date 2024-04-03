import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteReviewDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Delete Country'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' className='text-center'>
            Are you sure you want to delete the category.
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
      </Dialog>
    </Fragment>
  );
};

export default DeleteReviewDialog;
