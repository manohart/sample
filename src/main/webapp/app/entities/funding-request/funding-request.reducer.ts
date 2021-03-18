import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFundingRequest, defaultValue } from 'app/shared/model/funding-request.model';

export const ACTION_TYPES = {
  FETCH_FUNDINGREQUEST_LIST: 'fundingRequest/FETCH_FUNDINGREQUEST_LIST',
  FETCH_FUNDINGREQUEST: 'fundingRequest/FETCH_FUNDINGREQUEST',
  CREATE_FUNDINGREQUEST: 'fundingRequest/CREATE_FUNDINGREQUEST',
  UPDATE_FUNDINGREQUEST: 'fundingRequest/UPDATE_FUNDINGREQUEST',
  DELETE_FUNDINGREQUEST: 'fundingRequest/DELETE_FUNDINGREQUEST',
  RESET: 'fundingRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFundingRequest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FundingRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: FundingRequestState = initialState, action): FundingRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FUNDINGREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FUNDINGREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FUNDINGREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_FUNDINGREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_FUNDINGREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FUNDINGREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FUNDINGREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_FUNDINGREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_FUNDINGREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_FUNDINGREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDINGREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUNDINGREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FUNDINGREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_FUNDINGREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FUNDINGREQUEST):
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

const apiUrl = 'api/funding-requests';

// Actions

export const getEntities: ICrudGetAllAction<IFundingRequest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FUNDINGREQUEST_LIST,
    payload: axios.get<IFundingRequest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFundingRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FUNDINGREQUEST,
    payload: axios.get<IFundingRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFundingRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FUNDINGREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFundingRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FUNDINGREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFundingRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FUNDINGREQUEST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
