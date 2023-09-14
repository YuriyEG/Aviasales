import React from "react";
import './Ticket.css';

const Ticket = () => {
    return (
        <div className="ticket">
            <div className="ticket__title">
                <div className="ticket__price">
                    13 400 р
                </div>
                <div className="ticket__logo">

                </div>
            </div>
            <div className="ticket__flight-info">
                <div className="ticket__route">
                    <div className="ticket__cities-header">MOW - NKT</div>
                    <div className="ticket__cities-time">10:45 - 8:00</div>
                </div>
                <div className="ticket__travel-time">
                    <div className="ticket__travel-time-header">В ПУТИ</div>
                    <div className="ticket__travel-time-info">21ч 15м</div>
                </div>
                <div className="ticket__transfer">
                    <div className="ticket__transfer-count">2 ПЕРЕСАДКИ</div>
                    <div className="ticket__transfer-cities">NKG NGE</div>
                </div>
            </div>
            <div className="ticket__flight-info">
                <div className="ticket__route">
                    <div className="ticket__cities-header">MOW - NKT</div>
                    <div className="ticket__cities-time">10:45 - 8:00</div>
                </div>
                <div className="ticket__travel-time">
                    <div className="ticket__travel-time-header">В ПУТИ</div>
                    <div className="ticket__travel-time-info">21ч 15м</div>
                </div>
                <div className="ticket__transfer">
                    <div className="ticket__transfer-count">2 ПЕРЕСАДКИ</div>
                    <div className="ticket__transfer-cities">NKG NGE</div>
                </div>
            </div>


        </div>
    )
};

export default Ticket;