import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './funding-request-loan.reducer';
import { IFundingRequestLoan } from 'app/shared/model/funding-request-loan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFundingRequestLoanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingRequestLoanDetail = (props: IFundingRequestLoanDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fundingRequestLoanEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          FundingRequestLoan [<b>{fundingRequestLoanEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {fundingRequestLoanEntity.updatedAt ? (
              <TextFormat value={fundingRequestLoanEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Loan</dt>
          <dd>{fundingRequestLoanEntity.loanId ? fundingRequestLoanEntity.loanId : ''}</dd>
          <dt>Updated By</dt>
          <dd>{fundingRequestLoanEntity.updatedById ? fundingRequestLoanEntity.updatedById : ''}</dd>
          <dt>Funding Request</dt>
          <dd>{fundingRequestLoanEntity.fundingRequestId ? fundingRequestLoanEntity.fundingRequestId : ''}</dd>
        </dl>
        <Button tag={Link} to="/funding-request-loan" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/funding-request-loan/${fundingRequestLoanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fundingRequestLoan }: IRootState) => ({
  fundingRequestLoanEntity: fundingRequestLoan.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingRequestLoanDetail);
