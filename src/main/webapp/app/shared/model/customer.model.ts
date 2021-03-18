import { Moment } from 'moment';
import { ICustomerUser } from 'app/shared/model/customer-user.model';
import { IFundingRequest } from 'app/shared/model/funding-request.model';
import { ILoan } from 'app/shared/model/loan.model';

export interface ICustomer {
  id?: number;
  name?: string;
  code?: string;
  updatedAt?: string;
  admin1Id?: number;
  admin2Id?: number;
  updatedById?: number;
  customerUsers?: ICustomerUser[];
  fundingRequests?: IFundingRequest[];
  loans?: ILoan[];
}

export const defaultValue: Readonly<ICustomer> = {};
