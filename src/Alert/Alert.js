/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ message }) => {


  return (
    <div className="alert">
    {message}
    </div>
  );
};


export default Alert
