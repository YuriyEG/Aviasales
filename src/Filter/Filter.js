/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import { fltMode } from '../store/actions';

const Filter = ({ state, switchMode }) => {
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
      <div className="filter__tab" style={lowClass} id="low">
        САМЫЙ ДЕШЕВЫЙ
      </div>
      <div className="filter__tab" style={fstClass} id="fst">
        САМЫЙ БЫСТРЫЙ
      </div>
      <div className="filter__tab" style={optClass} id="opt">
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
      setTimeout(() => {
        dispatch(fltMode(e.target.id));
      }, 50);
      
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
