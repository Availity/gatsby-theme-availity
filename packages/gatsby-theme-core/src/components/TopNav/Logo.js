import React from 'react';
import classnames from 'classnames';
import logo from './logo.jpg';

const style = {
  borderRadius: '5px',
};

// Helper Component to render Logo
export default function Logo({ className, ...props }) {
  return (
    <img
      {...props}
      src={logo}
      alt="Logo"
      width="30"
      height="30"
      className={classnames('d-inline-block align-top', className)}
      style={style}
    />
  );
}
