/* eslint-disable */

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fltMode } from '../store/actions';

const Filter = ({ state, switchMode }) => {

  const [hover, setHover] = useState({opacity: '100%'});
  const [hover2, setHover2] = useState({opacity: '100%'});
  const [hover3, setHover3] = useState({opacity: '100%'});

  const over1 = () => {
    setHover({backgroundColor: 'rgba(33, 150, 243, 1)', opacity: '30%', color: 'white', border: 'rgba(33, 150, 243, 1)'});
  }
  const leave1 = () => {
    setHover({opacity: '100%'});
  }
  const over2 = () => {
    setHover2({backgroundColor: 'rgba(33, 150, 243, 1)', opacity: '30%', color: 'white', border: 'rgba(33, 150, 243, 1)' });
  }
  const leave2 = () => {
    setHover2({opacity: '100%'});
  }
  const over3 = () => {
    setHover3({backgroundColor: 'rgba(33, 150, 243, 1)', opacity: '30%', color: 'white', border: 'rgba(33, 150, 243, 1)'});
  }
  const leave3 = () => {
    setHover3({opacity: '100%'});
  }

  let lowClass;
  let fstClass;
  let optClass;
  if (state.filterMode === 'low') {
    lowClass = { backgroundColor: 'rgba(33, 150, 243, 1)', border: '1px solid rgba(33, 150, 243, 1)', color: 'white' };
  }
  if (state.filterMode === 'fst') {
    fstClass = { backgroundColor: 'rgba(33, 150, 243, 1)', border: '1px solid rgba(33, 150, 243, 1)', color: 'white' };
  }
  if (state.filterMode === 'opt') {
    optClass = { backgroundColor: 'rgba(33, 150, 243, 1)', border: '1px solid rgba(33, 150, 243, 1)', color: 'white' };
  }

  return (
    <div className="filter" onClick={switchMode}>
      <div className="filter__tab" onMouseOver={over1} onMouseLeave={leave1} style={{...hover, ...lowClass}} id="low">
        САМЫЙ ДЕШЕВЫЙ
      </div>
      <div className="filter__tab"  onMouseOver={over2} onMouseLeave={leave2} style={{...hover2, ...fstClass}} id="fst">
     
        САМЫЙ БЫСТРЫЙ
      </div>
      <div className="filter__tab"  onMouseOver={over3} onMouseLeave={leave3} style={{...hover3, ...optClass}} id="opt">
        ОПТИМАЛЬНЫЙ
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    switchMode: (e) => {
      dispatch(fltMode(e.target.id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
