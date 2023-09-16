export const inc = () => ({ type: 'INC'}) ;
export const dec = () => ({ type: 'DEC'}) ;
export const random = (payload) => ( {type: 'RANDOM', payload })