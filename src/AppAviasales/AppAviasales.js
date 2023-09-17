
import React, { useState } from "react";
import Ticket from '../Ticket';
import Filter from '../Filter';
import FilterOptions from "../FilterOptions";
import FiveMoreButton from '../FiveMoreButton';
import store from "../store/store";
import getAll from "../store/actions";
import TicketList from '../TicketList';

import { useEffect } from "react";









const AppAviasales = () => {

    const [searchId, setSearchId] = useState(null);
    const [tickets, setTickets] = useState([]);

    const [cheap, setCheap] = useState([]);
    const [fast, setFast] = useState([]);
    const [optimal, setOptimal] = useState([]);
    const [curTickets, setCurTickets] = useState([]);


    useEffect(() => {

        fetch('https://aviasales-test-api.kata.academy/search')
    .then( res => res.json())
    .then( json =>  {
      console.log(json);

      setSearchId(json.searchId);
      return json;
    })
    .catch( err => console.log(err))


    }, [])

    useEffect( () => {
        if (searchId !== null) {
            async function subscribe() {
                let response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
              
                if (response.status === 502 || response.status === 500) {
        
                  await subscribe();
                } else if (response.status !== 200) {
                  console.log(response.statusText);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  await subscribe();
                } else {
                  let ticketsPart = await response.json();
              

                    
                    setTickets((tickets) => {
                        let list = [...tickets, ...ticketsPart.tickets];
                        setTickets(list);
                        if (curTickets.length === 0) {
                            setCurTickets([...tickets]);                   
                        }

                    //                     if (!curTickets.length) {
                    //     setCurTickets(list);
                    // }    
                    
                    });

                
                    if (!ticketsPart.stop) {
              
                        console.log(ticketsPart.stop);
                        await subscribe();
                    }  else {

                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
              }
              
              subscribe();
        }

    }, [searchId])

    useEffect( () => {
        console.log('актуальный список билетов', tickets);
    }, [tickets])


 

    return (
        <div className="app-aviasales">
            

            <div className="app-aviasales__logo"></div>
            <div className="app-aviasales__main">

                <Filter />
                
                <FilterOptions/>
                <TicketList tickets={curTickets}/>


            </div>

        </div>
    )
}



export default AppAviasales;