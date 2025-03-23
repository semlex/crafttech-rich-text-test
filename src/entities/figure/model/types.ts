export type Figure = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  html: string;
};

export type FigureSliceState = {
  figures: Figure[];
  selectedFigure: Figure | null;
};

export type FigureFeatures = {
  figures: Figure[];
  selectedFigure: Figure | null;
};
