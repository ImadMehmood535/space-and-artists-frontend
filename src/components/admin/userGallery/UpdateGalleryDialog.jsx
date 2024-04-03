import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputFiles from 'react-input-files';

const UpdateGalleryDialog = ({ updateOpen, handleUpdateClose, handleUpdate, handleChange, fileName }) => {
  return (
    <Fragment>
      <Dialog
        open={updateOpen}
        className='AdminModal'
        onClose={handleUpdateClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Update Gallery Image'}
        </DialogTitle>
        <DialogContent>
          <form action='' className='form UploadedForm'>
            <div className='row'>
              <div className='col-12'>
                <label htmlFor='fileName'>Upload Image</label>
                <InputFiles onChange={(files) => handleChange(files)}>
                  <div className='Overlay DFlex'>
                    <span>{typeof fileName === 'object' ? fileName[0].name : 'Upload Profile Picture'}</span>
                    <button>UPLOAD</button>
                  </div>
                </InputFiles>
              </div>
            </div>
          </form>
          <div className='UploadedImg DFlex justify-content-center'>
            {fileName ? <img src={fileName} alt='Gallery Image' className='img-fluid' /> : null}
          </div>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-success' onClick={handleUpdate} color='primary'>
            Update Image
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UpdateGalleryDialog;
