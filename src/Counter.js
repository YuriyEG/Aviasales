import React from "react";

const Counter = ({inc, dec, random}) => {
    return (
        <div>
                  <h1 id='counter'>{count}</h1>
      <button id="dec" onClick={dec}>decrement</button>
      <button id="inc" onClick={inc}>increment</button>
      <button id="random" onClick={random}>random</button>
        </div>
    )
}

export default Counter;