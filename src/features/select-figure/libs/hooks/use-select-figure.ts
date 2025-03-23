import { useRef } from 'react';
import Konva from 'konva';
import { Figure, setSelectedFigure } from '@/entities/figure';
import { useAppDispatch, useAppSelector } from '@/shared/libs';

export const useSelectFigure = () => {
  const dispatch = useAppDispatch();

  const selectedFigure = useAppSelector((state) => state.figure.selectedFigure);

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelectFigure = (figure: Figure) => {
    dispatch(setSelectedFigure(figure));
  };

  const handleFigureClick = (event: Konva.KonvaEventObject<MouseEvent>, figure: Figure) => {
    event.cancelBubble = true;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      return;
    }

    clickTimeoutRef.current = setTimeout(() => {
      handleSelectFigure(figure);
      clickTimeoutRef.current = null;
    }, 200);
  };

  return { selectedFigure, handleFigureClick };
};
