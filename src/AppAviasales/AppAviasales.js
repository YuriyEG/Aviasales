
import React from "react";
import Ticket from '../Ticket';
import Filter from '../Filter';
import FilterOptions from "../FilterOptions";
import FiveMoreButton from '../FiveMoreButton';





const AppAviasales = () => {
    return (
        <div className="app-aviasales">
            

            <div className="app-aviasales__logo"></div>
            <Filter />
            <FilterOptions />
            {
                [1,3,3,4,5].map( node => <Ticket />)
            }
            <FiveMoreButton />
        </div>
    )
}

export default AppAviasales;