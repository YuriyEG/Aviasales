
import React from "react";
import Ticket from '../Ticket';
import Filter from '../Filter';
import FilterOptions from "../FilterOptions";
import FiveMoreButton from '../FiveMoreButton';
import store from "../store/store";
import getAll from "../store/actions";

import { useEffect } from "react";









const AppAviasales = () => {

    async function getId() {
        fetch('https://aviasales-test-api.kata.academy/search')
    .then( res => res.json())
    .then( json =>  {
      console.log(json);
      store.dispatch({type: 'ALL', searchId: json.searchId })
      return json;
    })
    .catch( err => console.log(err))
    }
    
    async function getTickets(id) {
    fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
    .then( res => res.json())
    .then( json =>  {
      console.log(json);
      store.dispatch({type: 'TIC', data: json })
      return json;
    })
    .catch( err => console.log(err))
    }

    useEffect(() => {
        getId();

    }, [])

    setTimeout(() => {
        const curId = store.getState().searchId;
        console.log('curId', curId);
        getTickets(curId);
        setTimeout(() => {
            console.log(store.getState());
        }, 2000);
        
    }, 5000);




    return (
        <div className="app-aviasales">
            
                <h1>{store.getState().searchId}</h1>
            <div className="app-aviasales__logo"></div>
            <div className="app-aviasales__main">

                
                <button onClick={() => store.dispatch(getAll())}>изменить стейт</button>
                <Filter />

                <FilterOptions/>
                {
                    [1,3,3,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map( node => <Ticket key={Date.now()*Math.random()} />)
                }
                <FiveMoreButton value={store.getState()} />
            </div>

        </div>
    )
}



export default AppAviasales;