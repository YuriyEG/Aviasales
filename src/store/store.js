/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const initialState = {
  filterMode: 'opt',
  searchId: null,
  tickets: [],
  stops1: true,
  stops2: true,
  stops3: true,
  stopsAll: true,
  stopsFree: false,
  buttonLoading: false,
  endPoint: 5
};
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  if (action.type === 'APT') {
    return { ...state, endPoint: state.endPoint + 5 }
  }
  if (action.type === 'LCK') {
    return { ...state, curTickets: [...action.tickets] };
  }
  if (action.type === 'LTK') {

    const newList = [...state.tickets, ...action.tickets];

    return { ...state, tickets: newList };
  }
  if (action.type === 'IDL') {
    return { ...state, searchId: action.seId };
  }
  if (action.type === 'FTL') {
    return { ...state, filterMode: action.mode };
  }
  if (action.type === 'BTL') {
    if (action.flag) {
      return { ...state, buttonLoading: action.flag };
    }
    return { ...state, buttonLoading: action.flag };
  }
  if (action.type === 'ALL') {
    const object = { modified: true, searchId: action.searchId };
    return object;
  }
  if (action.type === 'TIC') {
    const obj = JSON.parse(JSON.stringify(state));
    obj.data = action.data;
    return obj;
  }
  if (action.type === 'INC') {
    const value = state.first + 1;
    const x = { ...state, first: value };
    return x;
  }
  if (action.type === 'SPS') {
    const { stops1, stops2, stops3, stopsAll, stopsFree } = state;
    if (action.mode === 'all') {
      if (!stopsAll) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (stops1 && stops2 && stops3 && stopsAll && !stopsFree) {
        return { ...state, stops1: false, stops2: false, stops3: false, stopsAll: false, stopsFree: true };
      }
      if (!stops1 && !stops2 && !stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (!stops1 && stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
    }
    if (action.mode === 'no_stops') {
      if (!stopsFree) {
        return { ...state, stops1: false, stops2: false, stops3: false, stopsAll: false, stopsFree: true };
      }
      if (stops1 && stops2 && stops3 && stopsAll && !stopsFree) {
        return { ...state, stops1: false, stops2: false, stops3: false, stopsAll: false, stopsFree: true };
      }
      if (!stops1 && !stops2 && !stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stops2: true, stops3: true, stopsAll: true, stopsFree: false };
      }
      if (stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: false, stops2: false, stops3: false, stopsAll: false, stopsFree: true };
      }
      if (!stops1 && stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: false, stops2: false, stops3: false, stopsAll: false, stopsFree: true };
      }
    }

    if (action.mode === '1') {
      if (stops1 && !stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: false, stopsFree: true };
      }
      if (!stops1 && !stops2 && !stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stopsFree: false };
      }
      if (stops1 && stops2 && stops3 && stopsAll && !stopsFree) {
        return { ...state, stops1: false, stopsAll: false };
      }
      if (!stops1 && stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true, stopsAll: true };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true };
      }
      if (stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: false };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stopsFree: false };
      }
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true };
      }
      if (stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: false };
      }
    }

    if (action.mode === '2') {
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: false, stopsFree: true };
      }
      if (!stops1 && !stops2 && !stops3 && !stopsAll && stopsFree) {
        return { ...state, stops2: true, stopsFree: false };
      }
      if (stops1 && stops2 && stops3 && stopsAll && !stopsFree) {
        return { ...state, stops2: false, stopsAll: false };
      }
      if (!stops1 && stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: false, stopsAll: false };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: true, stopsAll: false };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true };
      }
      if (stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: true, stopsAll: true };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stopsFree: false };
      }
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true };
      }
      if (stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: false };
      }
      if (stops1 && !stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops2: true };
      }
    }
    if (action.mode === '3') {
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: true, stopsFree: false };
      }
      if (!stops1 && !stops2 && !stops3 && !stopsAll && stopsFree) {
        return { ...state, stops3: true, stopsFree: false };
      }
      if (stops1 && stops2 && stops3 && stopsAll && !stopsFree) {
        return { ...state, stops3: false, stopsAll: false };
      }
      if (!stops1 && stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: false, stopsAll: false };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: false, stopsFree: true };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops1: true };
      }
      if (stops1 && !stops2 && stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: false, stopsAll: false };
      }
      if (!stops1 && !stops2 && stops3 && !stopsAll && stopsFree) {
        return { ...state, stops1: true, stopsFree: false };
      }
      if (!stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: true, stopsAll: true };
      }
      if (stops1 && stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: true, stopsAll: true };
      }
      if (stops1 && !stops2 && !stops3 && !stopsAll && !stopsFree) {
        return { ...state, stops3: true, stopsAll: false };
      }
    }
  }

  return state;
};

const store = configureStore({ reducer }, composeWithDevTools(thunk));


export default store;
