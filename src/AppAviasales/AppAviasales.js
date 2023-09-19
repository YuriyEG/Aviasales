/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Filter from '../Filter';
import FilterOptions from '../FilterOptions';
import TicketList from '../TicketList';
import { schLoad, loadTicks, loadCur } from '../store/actions';
import Loader from '../Loader';

const AppAviasales = ({ state, searchIdLoad, ticketsLoad, curTicksLoad }) => {
  const getFilteredTickets = (recTicks, filtMode, stops1, stops2, stops3, stopsAll, stopsFree) => {
    let outPutTicks;
    if (filtMode === 'opt') {
      outPutTicks = [...recTicks];
    }
    if (filtMode === 'low') {
      outPutTicks = [...recTicks].sort((a, b) => a.price - b.price);
    }
    if (filtMode === 'fst') {
      outPutTicks = [...recTicks].sort((a, b) => a.segments[0].duration - b.segments[0].duration);
    }
    let outPutTicks2;
    if (stopsAll === true) {
      outPutTicks2 = [...outPutTicks];
    }
    if (stopsFree === true) {
      outPutTicks2 = [...outPutTicks].filter(
        (node) => node.segments[0].stops.length + node.segments[1].stops.length === 0
      );
    }
    if (stops1 === true && stops2 === false && stops3 === false && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter(
        (node) => node.segments[0].stops.length + node.segments[1].stops.length === 1
      );
    }

    if (stops1 === false && stops2 === true && stops3 === false && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter(
        (node) => node.segments[0].stops.length + node.segments[1].stops.length === 2
      );
    }
    if (stops1 === false && stops2 === false && stops3 === true && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter(
        (node) => node.segments[0].stops.length + node.segments[1].stops.length === 3
      );
    }
    if (stops1 === true && stops2 === true && stops3 === false && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter((node) => {
        const x = node.segments[0].stops.length + node.segments[1].stops.length;
        if (x === 1 || x === 2) {
          return true;
        }
        return false;
      });
    }

    if (stops1 === true && stops2 === true && stops3 === true && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter((node) => {
        const x = node.segments[0].stops.length + node.segments[1].stops.length;
        if (x === 1 || x === 2 || x === 3) {
          return true;
        }
        return false;
      });
    }
    if (stops1 === true && stops2 === false && stops3 === true && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter((node) => {
        const x = node.segments[0].stops.length + node.segments[1].stops.length;
        if (x === 1 || x === 3) {
          return true;
        }
        return false;
      });
    }
    if (stops1 === false && stops2 === true && stops3 === true && !stopsAll) {
      outPutTicks2 = [...outPutTicks].filter((node) => {
        const x = node.segments[0].stops.length + node.segments[1].stops.length;
        if (x === 2 || x === 3) {
          return true;
        }
        return false;
      });
    }
    return outPutTicks2;
  };

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

  useEffect(() => {
    if (state.curTickets.length === 0) {
      console.log('Boommmmmmmm');
    }
  }, [state.tickets]);

  const percents = Math.round(100*(state.tickets.length)/10000);

  return (
    <div className="app-aviasales">
      <div className="app-aviasales__logo"></div>
      <div className="app-aviasales__main">
        <Filter />
        <Loader percents={percents}/>
        
        <FilterOptions />
        <TicketList />
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
