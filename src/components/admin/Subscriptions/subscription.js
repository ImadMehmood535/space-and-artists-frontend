import React, {Fragment } from 'react';
import UsersTable from './subscriptionTable';

function Subscription(){
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

export default Subscription;
