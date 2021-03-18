import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/customer">
      Customer
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer-user">
      Customer User
    </MenuItem>
    <MenuItem icon="asterisk" to="/loan">
      Loan
    </MenuItem>
    <MenuItem icon="asterisk" to="/funding-request">
      Funding Request
    </MenuItem>
    <MenuItem icon="asterisk" to="/funding-request-loan">
      Funding Request Loan
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
