import React, { useState } from 'react';
/* eslint-disable-next-line */
import { connect } from 'react-redux';

import Ticket from '../Ticket';
import FiveMoreButton from '../FiveMoreButton';

const TicketList = ({ state, displayTickets }) => {
  const [ready, setReady] = useState(false);
  const cur = displayTickets.slice(0, state.endPoint);
  setTimeout(() => {
    setReady(true);
  }, 100);
  return (
    <div className="ticket-list">
      {ready ? (
        <div>
          {cur.map((ticket) => (
            <Ticket ticket={ticket} key={cur.indexOf(ticket)} />
          ))}
          <FiveMoreButton />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(TicketList);
