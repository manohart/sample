import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerUser from './customer-user';
import CustomerUserDetail from './customer-user-detail';
import CustomerUserUpdate from './customer-user-update';
import CustomerUserDeleteDialog from './customer-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerUser} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomerUserDeleteDialog} />
  </>
);

export default Routes;
