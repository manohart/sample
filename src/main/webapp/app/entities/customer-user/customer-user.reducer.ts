import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerUser, defaultValue } from 'app/shared/model/customer-user.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERUSER_LIST: 'customerUser/FETCH_CUSTOMERUSER_LIST',
  FETCH_CUSTOMERUSER: 'customerUser/FETCH_CUSTOMERUSER',
  CREATE_CUSTOMERUSER: 'customerUser/CREATE_CUSTOMERUSER',
  UPDATE_CUSTOMERUSER: 'customerUser/UPDATE_CUSTOMERUSER',
  DELETE_CUSTOMERUSER: 'customerUser/DELETE_CUSTOMERUSER',
  RESET: 'customerUser/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerUser>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CustomerUserState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerUserState = initialState, action): CustomerUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERUSER):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERUSER):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERUSER):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERUSER):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERUSER):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customer-users';

// Actions

export const getEntities: ICrudGetAllAction<ICustomerUser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERUSER_LIST,
    payload: axios.get<ICustomerUser>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICustomerUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERUSER,
    payload: axios.get<ICustomerUser>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICustomerUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERUSER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERUSER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERUSER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
