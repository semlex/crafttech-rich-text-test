import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Figure, FigureSliceState } from './types';

const initialState: FigureSliceState = {
  figures: [],
  selectedFigure: null,
};

const figureSlice = createSlice({
  name: 'figure',
  initialState,
  reducers: {
    addFigure(state, action: PayloadAction<Figure>) {
      state.figures.push(action.payload);
    },
    setSelectedFigure(state, action: PayloadAction<Figure | null>) {
      state.selectedFigure = action.payload;
    },
    updateSelectedFigure(state, action: PayloadAction<Partial<Figure> | null>) {
      if (state.selectedFigure) {
        const updatedFigure = { ...state.selectedFigure, ...action.payload };
        const idx = state.figures.findIndex((figure) => figure.id === updatedFigure.id);
        if (idx !== -1) {
          state.figures[idx] = updatedFigure;
        }
        state.selectedFigure = updatedFigure;
      }
    },
  },
});

export const { addFigure, setSelectedFigure, updateSelectedFigure } = figureSlice.actions;

export default figureSlice.reducer;
