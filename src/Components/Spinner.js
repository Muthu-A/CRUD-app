import React from 'react';
import { Spin } from 'antd';

const Spinner = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999
    }}
  >
    <Spin size='large' />
  </div>
);

export default Spinner;
