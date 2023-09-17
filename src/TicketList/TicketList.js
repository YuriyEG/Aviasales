import React, { useEffect } from "react";
import { useState } from "react";
import Ticket from "../Ticket";
import FiveMoreButton from '../FiveMoreButton';


const TicketList = ({tickets}) => {


    const [endPoint, setEndPoint] = useState(5);
    let cur = tickets.slice(0, endPoint);

    return (
        <div className="ticket-list">
            {
                cur.map( ticket => <Ticket ticket={ticket} key={Math.random()*Date.now()}/> )
            }
            <FiveMoreButton onClick={ () => setEndPoint(endPoint  + 5)}  />
        </div>
    )
}


export default TicketList;