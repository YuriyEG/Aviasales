/* eslint-disable */
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import { buttLoad } from '../store/actions';

const antIcon = <LoadingOutlined style={{ fontSize: 30, color: 'white' }} spin />;

const FiveMoreButton = ({ state, buttonLoading }) => {
  return (
    <div>
      <button className="five-more-button" onClick={buttonLoading}>
        {state.buttonLoading ? <Spin indicator={antIcon} /> : 'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ! '}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buttonLoading: () => {
      dispatch(buttLoad(true));
      setTimeout(() => {
        dispatch(buttLoad(false));
      }, 600);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveMoreButton);
