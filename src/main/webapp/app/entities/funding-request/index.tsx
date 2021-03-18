import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FundingRequest from './funding-request';
import FundingRequestDetail from './funding-request-detail';
import FundingRequestUpdate from './funding-request-update';
import FundingRequestDeleteDialog from './funding-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FundingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FundingRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundingRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={FundingRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FundingRequestDeleteDialog} />
  </>
);

export default Routes;
