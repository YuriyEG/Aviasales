/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import Ticket from '../Ticket';
import FiveMoreButton from '../FiveMoreButton';

const TicketList = ({ state, displayTickets }) => {
  const cur = displayTickets.slice(0, state.endPoint);
  return (
    <div className="ticket-list">
      {cur.map((ticket) => (
        <Ticket ticket={ticket} key={Date.now() * Math.random()} />
      ))}
      <FiveMoreButton />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(TicketList);
