import { Moment } from 'moment';

export interface ILoan {
  id?: number;
  loanId?: string;
  borrowerName?: string;
  amount?: number;
  status?: string;
  updatedAt?: string;
  updatedById?: number;
  customerId?: number;
}

export const defaultValue: Readonly<ILoan> = {};
