/* eslint-disable */

import React, { useState, useEffect, Suspense } from 'react';
import getSortedList from '../sortFilter';
import { connect } from 'react-redux';
import { Online, Offline } from 'react-detect-offline';

import Filter from '../Filter';
import Alert from '../Alert';
import FilterOptions from '../FilterOptions';
import TicketList from '../TicketList';
import { schLoad, loadTicks, loadCur, showMessage, setSuccess } from '../store/actions';
import Loader from '../Loader';

const AppAviasales = ({ state, searchIdLoad, ticketsLoad, setMessage, setSuccessStatus }) => {

  const [serverError, setServerError] = useState(false);

  const showServerError = () => {
    setServerError(true);
    setTimeout(() => {
      setServerError(false);
    }, 8000);
  }


  let ticks = getSortedList(state);

  useEffect(() => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => res.json())
      .then((json) => {
        
        searchIdLoad(json.searchId);
      })
      .catch( () => setSuccess(false))
  }, []);

  async function subscribe() {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${state.searchId}`);

    if (response.status === 502 || response.status === 500) {
      if(!serverError) showServerError();
      
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

  const percents = Math.round(100*(state.tickets.length)/5000);

  return (
    <div className="app-aviasales">
      <div className="app-aviasales__logo"></div>
      <div className="app-aviasales__main">
       
        
        <Filter />
        { serverError ? <Alert message={'Ошибка сервера'}/> : null }
        <Offline>
          <Alert message={'Нет соединения'}/>
        </Offline>
        <Loader percents={percents}/>
        

        <FilterOptions />
        {
          !ticks.length ? <div class='app-aviasales__note'>Рейсов, подходящих под заданные фильтры, не найдено</div> : null
        }
        
        <TicketList displayTickets={ticks}/>
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
    setMessage: (value) => {
      dispatch(showMessage(value));
    },  
    setSuccessStatus: (flag) => {
      dispatch(setSuccess(flag))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAviasales);
