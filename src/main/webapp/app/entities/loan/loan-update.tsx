import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './loan.reducer';
import { ILoan } from 'app/shared/model/loan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LoanUpdate = (props: ILoanUpdateProps) => {
  const [updatedById, setUpdatedById] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { loanEntity, users, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/loan' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getCustomers();
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
        ...loanEntity,
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
          <h2 id="mfoApp.loan.home.createOrEditLabel">Create or edit a Loan</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : loanEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="loan-id">ID</Label>
                  <AvInput id="loan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="loanIdLabel" for="loan-loanId">
                  Loan Id
                </Label>
                <AvField id="loan-loanId" type="text" name="loanId" />
              </AvGroup>
              <AvGroup>
                <Label id="borrowerNameLabel" for="loan-borrowerName">
                  Borrower Name
                </Label>
                <AvField id="loan-borrowerName" type="text" name="borrowerName" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="loan-amount">
                  Amount
                </Label>
                <AvField id="loan-amount" type="text" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="loan-status">
                  Status
                </Label>
                <AvField id="loan-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="loan-updatedAt">
                  Updated At
                </Label>
                <AvInput
                  id="loan-updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.loanEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="loan-updatedBy">Updated By</Label>
                <AvInput id="loan-updatedBy" type="select" className="form-control" name="updatedById">
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
                <Label for="loan-customer">Customer</Label>
                <AvInput id="loan-customer" type="select" className="form-control" name="customerId">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/loan" replace color="info">
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
  users: storeState.userManagement.users,
  customers: storeState.customer.entities,
  loanEntity: storeState.loan.entity,
  loading: storeState.loan.loading,
  updating: storeState.loan.updating,
  updateSuccess: storeState.loan.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoanUpdate);
