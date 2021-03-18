import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFundingRequestLoan, defaultValue } from 'app/shared/model/funding-request-loan.model';

export const ACTION_TYPES = {
  FETCH_FUNDINGREQUESTLOAN_LIST: 'fundingRequestLoan/FETCH_FUNDINGREQUESTLOAN_LIST',
  FETCH_FUNDINGREQUESTLOAN: 'fundingRequestLoan/FETCH_FUNDINGREQUESTLOAN',
  CREATE_FUNDINGREQUESTLOAN: 'fundingRequestLoan/CREATE_FUNDINGREQUESTLOAN',
  UPDATE_FUNDINGREQUESTLOAN: 'fundingRequestLoan/UPDATE_FUNDINGREQUESTLOAN',
  DELETE_FUNDINGREQUESTLOAN: 'fundingRequestLoan/DELETE_FUNDINGREQUESTLOAN',
  RESET: 'fundingRequestLoan/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFundingRequestLoan>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FundingRequestLoanState = Readonly<typeof initialState>;

// Reducer

export default (state: FundingRequestLoanState = initialState, action): FundingRequestLoanState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FUNDINGREQUESTLOAN):
    case REQUEST(ACTION_TYPES.UPDATE_FUNDINGREQUESTLOAN):
    case REQUEST(ACTION_TYPES.DELETE_FUNDINGREQUESTLOAN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN):
    case FAILURE(ACTION_TYPES.CREATE_FUNDINGREQUESTLOAN):
    case FAILURE(ACTION_TYPES.UPDATE_FUNDINGREQUESTLOAN):
    case FAILURE(ACTION_TYPES.DELETE_FUNDINGREQUESTLOAN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FUNDINGREQUESTLOAN):
    case SUCCESS(ACTION_TYPES.UPDATE_FUNDINGREQUESTLOAN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FUNDINGREQUESTLOAN):
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

const apiUrl = 'api/funding-request-loans';

// Actions

export const getEntities: ICrudGetAllAction<IFundingRequestLoan> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN_LIST,
    payload: axios.get<IFundingRequestLoan>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFundingRequestLoan> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FUNDINGREQUESTLOAN,
    payload: axios.get<IFundingRequestLoan>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFundingRequestLoan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FUNDINGREQUESTLOAN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFundingRequestLoan> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FUNDINGREQUESTLOAN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFundingRequestLoan> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FUNDINGREQUESTLOAN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
