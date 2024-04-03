import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddCountryDialog = ({ addOpen, handleAddClose, handleChange, handleSubmit, name }) => {
  return (
    <Fragment>
      <Dialog
        open={addOpen}
        className='AdminModal'
        onClose={handleAddClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Add Country'}
        </DialogTitle>
        <DialogContent>
          <form action='' className='form CountryForm'>
            <TextField name='name' value={name} onChange={handleChange} label='Country Name' />
          </form>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-success' onClick={handleSubmit} color='primary'>
            Add Country
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddCountryDialog;
