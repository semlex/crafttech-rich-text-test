import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { figureReducer } from '@/entities/figure';

const rootReducer = combineReducers({
  figure: figureReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
