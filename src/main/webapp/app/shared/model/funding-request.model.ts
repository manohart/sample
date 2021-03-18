import { Moment } from 'moment';
import { IFundingRequestLoan } from 'app/shared/model/funding-request-loan.model';

export interface IFundingRequest {
  id?: number;
  code?: string;
  status?: string;
  updatedAt?: string;
  updatedById?: number;
  fundingRequestLoans?: IFundingRequestLoan[];
  customerId?: number;
}

export const defaultValue: Readonly<IFundingRequest> = {};
