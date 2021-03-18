import { Moment } from 'moment';

export interface IFundingRequestLoan {
  id?: number;
  updatedAt?: string;
  loanId?: number;
  updatedById?: number;
  fundingRequestId?: number;
}

export const defaultValue: Readonly<IFundingRequestLoan> = {};
