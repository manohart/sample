import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILoan } from 'app/shared/model/loan.model';
import { getEntities as getLoans } from 'app/entities/loan/loan.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IFundingRequest } from 'app/shared/model/funding-request.model';
import { getEntities as getFundingRequests } from 'app/entities/funding-request/funding-request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './funding-request-loan.reducer';
import { IFundingRequestLoan } from 'app/shared/model/funding-request-loan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFundingRequestLoanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingRequestLoanUpdate = (props: IFundingRequestLoanUpdateProps) => {
  const [loanId, setLoanId] = useState('0');
  const [updatedById, setUpdatedById] = useState('0');
  const [fundingRequestId, setFundingRequestId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fundingRequestLoanEntity, loans, users, fundingRequests, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/funding-request-loan' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLoans();
    props.getUsers();
    props.getFundingRequests();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...fundingRequestLoanEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="mfoApp.fundingRequestLoan.home.createOrEditLabel">Create or edit a FundingRequestLoan</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fundingRequestLoanEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="funding-request-loan-id">ID</Label>
                  <AvInput id="funding-request-loan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="updatedAtLabel" for="funding-request-loan-updatedAt">
                  Updated At
                </Label>
                <AvInput
                  id="funding-request-loan-updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fundingRequestLoanEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="funding-request-loan-loan">Loan</Label>
                <AvInput id="funding-request-loan-loan" type="select" className="form-control" name="loanId">
                  <option value="" key="0" />
                  {loans
                    ? loans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="funding-request-loan-updatedBy">Updated By</Label>
                <AvInput id="funding-request-loan-updatedBy" type="select" className="form-control" name="updatedById">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="funding-request-loan-fundingRequest">Funding Request</Label>
                <AvInput id="funding-request-loan-fundingRequest" type="select" className="form-control" name="fundingRequestId">
                  <option value="" key="0" />
                  {fundingRequests
                    ? fundingRequests.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/funding-request-loan" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loans: storeState.loan.entities,
  users: storeState.userManagement.users,
  fundingRequests: storeState.fundingRequest.entities,
  fundingRequestLoanEntity: storeState.fundingRequestLoan.entity,
  loading: storeState.fundingRequestLoan.loading,
  updating: storeState.fundingRequestLoan.updating,
  updateSuccess: storeState.fundingRequestLoan.updateSuccess,
});

const mapDispatchToProps = {
  getLoans,
  getUsers,
  getFundingRequests,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingRequestLoanUpdate);
