const reducer = (state = 0, action) => {
    if (action.type === 'INC') {
      return state + 1;
    }
    if (action.type === 'DEC') {
      return state - 1;
    }
    if (action.type === 'RANDOM') {
      return state + action.payload;
    }
    
    return state;
  }

  export default reducer;