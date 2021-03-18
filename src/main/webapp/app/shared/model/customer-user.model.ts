import { Moment } from 'moment';

export interface ICustomerUser {
  id?: number;
  updatedAt?: string;
  userId?: number;
  updatedById?: number;
  customerId?: number;
}

export const defaultValue: Readonly<ICustomerUser> = {};
