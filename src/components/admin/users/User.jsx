import React, { Component, Fragment } from 'react';
import UsersTable from './UsersTable';

export class User extends Component {
  render() {
    return (
      <Fragment>
        <div className='MainAdminWrapper'>
          <div className='UserTableDiv DBlock'>
            <UsersTable />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default User;
