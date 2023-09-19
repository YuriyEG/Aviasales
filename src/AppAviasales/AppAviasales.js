/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Filter from '../Filter';
import FilterOptions from '../FilterOptions';
import TicketList from '../TicketList';
import { schLoad, loadTicks, loadCur } from '../store/actions';
import Loader from '../Loader';

const AppAviasales = ({ state, searchIdLoad, ticketsLoad, curTicksLoad }) => {


  let displayTickets;
  if (state.filterMode === 'opt') {
      displayTickets = [...state.tickets];
  }
  if (state.filterMode === 'low') {
      displayTickets = [...state.tickets].sort( (a, b) => a.price - b.price );
      
  }
  if (state.filterMode === 'fst') {
      displayTickets = [...state.tickets].sort( (a, b) => a.segments[0].duration - b.segments[0].duration );
  }

  let displayTickets2;
  if (state.stopsAll === true ) {
      displayTickets2 = [...displayTickets];
  } 
  if (state.stopsFree === true ) {
      displayTickets2 = [...displayTickets].filter( node => node.segments[0].stops.length + node.segments[1].stops.length === 0 )
  }
  if (state.stops1 === true &&
      state.stops2 === false &&
      state.stops3 === false &&
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => node.segments[0].stops.length + node.segments[1].stops.length === 1 )
      }
      if (state.stops1 === false &&
          state.stops2 === true &&
          state.stops3 === false &&
          !state.stopsAll) {
              displayTickets2 = [...displayTickets].filter( node => node.segments[0].stops.length + node.segments[1].stops.length === 2 )
          }
  if (state.stops1 === false &&
      state.stops2 === false &&
      state.stops3 === true &&
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => node.segments[0].stops.length + node.segments[1].stops.length === 3 )
      }
  if (state.stops1 === true &&
      state.stops2 === true &&
      state.stops3 === false &&
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => {
              let x = node.segments[0].stops.length + node.segments[1].stops.length;
              if (x === 1 || x === 2) {
                  return true;
              } else {
                  return false;
              }
          } )
      }
  if (state.stops1 === true &&
      state.stops2 === true &&
      state.stops3 === true &&
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => {
              let x = node.segments[0].stops.length + node.segments[1].stops.length;
              if (x === 1 || x === 2 || x === 3) {
                  return true;
              } else {
                  return false;
              }
          } )
      }
  if (state.stops1 === true &&
      state.stops2 === false &&
      state.stops3 === true &&
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => {
              let x = node.segments[0].stops.length + node.segments[1].stops.length;
              if (x === 1 ||  x === 3) {
                  return true;
              } else {
                  return false;
              }
          } )
      }
  if (state.stops1 === false &&
      state.stops2 === true &&
      state.stops3 === true && 
      !state.stopsAll ) {
          displayTickets2 = [...displayTickets].filter( node => {
              let x = node.segments[0].stops.length + node.segments[1].stops.length;
              if ( x === 2 || x === 3 ) {
                  return true;
              } else {
                  return false;
              }
          } )
      }



  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((json) => {
        searchIdLoad(json.searchId);
      });
  }, []);

  async function subscribe() {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${state.searchId}`);

    if (response.status === 502 || response.status === 500) {
      await subscribe();
    } else if (response.status !== 200) {
      /* eslint-disable-next-line */
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      const ticksPart = await response.json();

      ticketsLoad(ticksPart.tickets);
      if (!ticksPart.stop) {
        await subscribe();
      } else {
        /* eslint-disable-next-line */
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
  useEffect(() => {
    if (state.searchId !== null) {
      subscribe();
    }
  }, [state.searchId]);

  const percents = Math.round(100*(state.tickets.length)/17000);

  return (
    <div className="app-aviasales">
      <div className="app-aviasales__logo"></div>
      <div className="app-aviasales__main">
        <Filter />
        <Loader percents={percents}/>
        
        <FilterOptions />
        <TicketList displayTickets={displayTickets2}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchIdLoad: (seId) => {
      dispatch(schLoad(seId));
    },
    ticketsLoad: (tcks) => {
      dispatch(loadTicks(tcks));
    },
    curTicksLoad: (ticks) => {
      dispatch(loadCur(ticks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAviasales);
