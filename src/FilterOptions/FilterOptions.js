import React from "react";

const FilterOptions = ({setStopsCount, 
                        stops1,
                        stops2,
                        stops3,
                        stopsAll,
                        stopsFree }) => {

    let class1 = 'filter-options__checkbox';
    stops1 ? class1 += ' checked' : class1 += '';
    let class2 = 'filter-options__checkbox';
    stops2 ? class2 += ' checked' : class2 += '';
    let class3 = 'filter-options__checkbox';
    stops3 ? class3 += ' checked' : class3 += '';
    let classAll = 'filter-options__checkbox';
    stopsAll ? classAll += ' checked': classAll += '';
    let classFree = 'filter-options__checkbox';
    stopsFree ? classFree += ' checked': classFree += '';


    return (
        <div className="filter-options" onClick={setStopsCount}>
            <div className="filter-options__header">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
                <div className="filter-options__body">
                    <div className="filter-options__option">
                <div className={classAll} id='all'></div>
                <div className="filter-options__label">Все</div>
            </div>
            <div className="filter-options__option">
                <div className={classFree} id='no_stops'></div>
                <div className="filter-options__label" >Без пересадок</div>
            </div>
            <div className="filter-options__option">
                <div className={class1} id='1'></div>
                <div className="filter-options__label">1 пересадка</div>
            </div>
            <div className="filter-options__option">
                <div className={class2} id='2'></div>
                <div className="filter-options__label" >2 пересадки</div>
            </div>
            <div className="filter-options__option">
                <div className={class3} id='3'></div>
                <div className="filter-options__label" >3 пересадки</div>
            </div>
                </div>
            

        </div>
    )
}

export default FilterOptions;