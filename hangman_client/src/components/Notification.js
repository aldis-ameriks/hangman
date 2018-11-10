import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

const variants = {
  error: { color: red[600], icon: ErrorIcon },
  info: { color: blue[600], icon: InfoIcon },
  success: { color: green[600], icon: CheckCircleIcon },
  warning: { color: amber[600], icon: WarningIcon }
};

const NotificationStyled = styled.div`
  background-color: ${props => props.color};
  font-size: 1rem;
  padding: 1rem;
  color: white;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  vertical-align: middle;
  display: flex;
  align-items: center;
`;

const IconStyled = styled.div`
  font-size: 20px;
  vertical-align: middle;
  margin-right: 1rem;
`;

const Notification = ({ children, variant }) => {
  const color = variants[variant].color;
  const Icon = variants[variant].icon;
  return (
    <NotificationStyled color={color}>
      <IconStyled as={Icon} />
      {children}
    </NotificationStyled>
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['error', 'success', 'info', 'warning']).isRequired
};

export default Notification;
