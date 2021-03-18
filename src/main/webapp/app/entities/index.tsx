import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import CustomerUser from './customer-user';
import Loan from './loan';
import FundingRequest from './funding-request';
import FundingRequestLoan from './funding-request-loan';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}customer-user`} component={CustomerUser} />
      <ErrorBoundaryRoute path={`${match.url}loan`} component={Loan} />
      <ErrorBoundaryRoute path={`${match.url}funding-request`} component={FundingRequest} />
      <ErrorBoundaryRoute path={`${match.url}funding-request-loan`} component={FundingRequestLoan} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
