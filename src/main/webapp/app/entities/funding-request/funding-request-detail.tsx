import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './funding-request.reducer';
import { IFundingRequest } from 'app/shared/model/funding-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFundingRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingRequestDetail = (props: IFundingRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fundingRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          FundingRequest [<b>{fundingRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{fundingRequestEntity.code}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{fundingRequestEntity.status}</dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {fundingRequestEntity.updatedAt ? (
              <TextFormat value={fundingRequestEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Updated By</dt>
          <dd>{fundingRequestEntity.updatedById ? fundingRequestEntity.updatedById : ''}</dd>
          <dt>Customer</dt>
          <dd>{fundingRequestEntity.customerId ? fundingRequestEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/funding-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/funding-request/${fundingRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fundingRequest }: IRootState) => ({
  fundingRequestEntity: fundingRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingRequestDetail);
