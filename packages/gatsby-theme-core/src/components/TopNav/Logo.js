import React, { Fragment } from 'react';
import classnames from 'classnames';
import logo from './CodeOnBrandMark.png';

const style = {
  borderRadius: '5px',
};

// Helper Component to render Logo
export default function Logo({ className, ...props }) {
  return (
    <Fragment>
      <img
        {...props}
        src={logo}
        alt="Logo"
        height="30"
        className={classnames('d-inline-block align-top mr-2', className)}
        style={style}
      />{' '}
      Availity Docs
    </Fragment>
  );
}
