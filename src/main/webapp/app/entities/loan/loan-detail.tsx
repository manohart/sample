import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './loan.reducer';
import { ILoan } from 'app/shared/model/loan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LoanDetail = (props: ILoanDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { loanEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Loan [<b>{loanEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="loanId">Loan Id</span>
          </dt>
          <dd>{loanEntity.loanId}</dd>
          <dt>
            <span id="borrowerName">Borrower Name</span>
          </dt>
          <dd>{loanEntity.borrowerName}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{loanEntity.amount}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{loanEntity.status}</dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>{loanEntity.updatedAt ? <TextFormat value={loanEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>Updated By</dt>
          <dd>{loanEntity.updatedById ? loanEntity.updatedById : ''}</dd>
          <dt>Customer</dt>
          <dd>{loanEntity.customerId ? loanEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/loan" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/loan/${loanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ loan }: IRootState) => ({
  loanEntity: loan.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetail);
