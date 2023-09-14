
import React from "react";
import Ticket from '../Ticket';
import Filter from '../Filter';
import FilterOptions from "../FilterOptions";





const AppAviasales = () => {
    return (
        <div className="app-aviasales">
            <FilterOptions />
            <div className="app-aviasales__logo"></div>
            <Filter />
            
            {
                [1,3,3,4, 34].map( node => <Ticket />)
            }

        </div>
    )
}

export default AppAviasales;