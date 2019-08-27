import React from 'react';
import logo from './logo.jpg';

const style = {
  borderRadius: '5px',
};

// Helper Component to render Logo
export default function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      width="30"
      height="30"
      className="d-inline-block align-top"
      style={style}
    />
  );
}
