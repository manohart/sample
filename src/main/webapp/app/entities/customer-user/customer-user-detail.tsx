import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-user.reducer';
import { ICustomerUser } from 'app/shared/model/customer-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUserDetail = (props: ICustomerUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          CustomerUser [<b>{customerUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {customerUserEntity.updatedAt ? <TextFormat value={customerUserEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>User</dt>
          <dd>{customerUserEntity.userId ? customerUserEntity.userId : ''}</dd>
          <dt>Updated By</dt>
          <dd>{customerUserEntity.updatedById ? customerUserEntity.updatedById : ''}</dd>
          <dt>Customer</dt>
          <dd>{customerUserEntity.customerId ? customerUserEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-user/${customerUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerUser }: IRootState) => ({
  customerUserEntity: customerUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUserDetail);
