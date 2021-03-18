import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';

// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import customerUser, {
  CustomerUserState
} from 'app/entities/customer-user/customer-user.reducer';
// prettier-ignore
import loan, {
  LoanState
} from 'app/entities/loan/loan.reducer';
// prettier-ignore
import fundingRequest, {
  FundingRequestState
} from 'app/entities/funding-request/funding-request.reducer';
// prettier-ignore
import fundingRequestLoan, {
  FundingRequestLoanState
} from 'app/entities/funding-request-loan/funding-request-loan.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly customer: CustomerState;
  readonly customerUser: CustomerUserState;
  readonly loan: LoanState;
  readonly fundingRequest: FundingRequestState;
  readonly fundingRequestLoan: FundingRequestLoanState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  customer,
  customerUser,
  loan,
  fundingRequest,
  fundingRequestLoan,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
