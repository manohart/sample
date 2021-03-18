import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FundingRequestLoan from './funding-request-loan';
import FundingRequestLoanDetail from './funding-request-loan-detail';
import FundingRequestLoanUpdate from './funding-request-loan-update';
import FundingRequestLoanDeleteDialog from './funding-request-loan-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FundingRequestLoanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FundingRequestLoanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundingRequestLoanDetail} />
      <ErrorBoundaryRoute path={match.url} component={FundingRequestLoan} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FundingRequestLoanDeleteDialog} />
  </>
);

export default Routes;
