//
//
export const setStp = (mode) => ({ type: 'SPS', mode });
export const buttLoad = (flag) => ({ type: 'BTL', flag });
export const fltMode = (mode) => ({ type: 'FTL', mode });
export const schLoad = (seId) => ({ type: 'IDL', seId });
export const loadTicks = (tickets) => ({ type: 'LTK', tickets });
export const loadCur = (tickets) => {
  return { type: 'LCK', tickets };
};
