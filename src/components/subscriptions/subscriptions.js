import React, {Fragment } from 'react';
import UsersTable from './SubscriptionsTable';

function Subscriptions(){
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

export default Subscriptions;
