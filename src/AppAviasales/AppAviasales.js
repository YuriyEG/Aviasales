
import React, { useState } from "react";
import Ticket from '../Ticket';
import Filter from '../Filter';
import FilterOptions from "../FilterOptions";
import FiveMoreButton from '../FiveMoreButton';
import store from "../store/store";
import getAll from "../store/actions";
import TicketList from '../TicketList';

import { useEffect } from "react";









const AppAviasales = ({store}) => {

    // async function getId() {
    //     fetch('https://aviasales-test-api.kata.academy/search')
    // .then( res => res.json())
    // .then( json =>  {
    //   console.log(json);
    //   store.dispatch({type: 'ALL', searchId: json.searchId })
    //   return json;
    // })
    // .catch( err => console.log(err))
    // }
    
    // async function getTickets(id) {
    // fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
    // .then( res => res.json())
    // .then( json =>  {
    //   console.log(json);
    //   store.dispatch({type: 'TIC', data: json })
    //   return json;
    // })
    // .catch( err => console.log(err))
    // }

    // useEffect(() => {
    //     getId();

    // }, [])

    // setTimeout(() => {
    //     const curId = store.getState().searchId;
    //     console.log('curId', curId);
    //     getTickets(curId);
    //     setTimeout(() => {
    //         console.log(store.getState());
  
    //     }, 1000);

        
    // }, 1000);
    const [searchId, setSearchId] = useState(null);
    const [tickets, setTickets] = useState([]);


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
                    });
                
                    if (!ticketsPart.stop) {
              
                        console.log(ticketsPart.stop);
                        await subscribe();
                    }  else {
                        console.log('all tickets is loaded');
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
                <TicketList store={store} />

                <FiveMoreButton value={store.getState()} />
            </div>

        </div>
    )
}



export default AppAviasales;