/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import { buttLoad, changePoint } from '../store/actions';


const FiveMoreButton = ({ state, buttonLoading }) => {
  const [ hoverOn, setHoverOn ] = useState({opacity: '100%'});
  const antIcon = <LoadingOutlined style={{ fontSize: 30, color: 'white' }} spin />;
  const hover = () => {
    setHoverOn({opacity: '75%'});
  }
  const hoverOf = () => {
    setHoverOn({opacity: '100%'});
  }
  return (
    <div>
      <button className="five-more-button" onMouseLeave={hoverOf} onMouseOver={hover} onClick={buttonLoading}>
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
          dispatch(changePoint());
          dispatch(buttLoad(false));
        }, 500);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveMoreButton);
