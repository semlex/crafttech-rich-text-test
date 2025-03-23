import { MutableRefObject } from 'react';
import Konva from 'konva';
import { useAppDispatch } from '@/shared/libs';
import { Figure, updateSelectedFigure } from '@/entities/figure';

export const useFigureTransform = () => {
  const dispatch = useAppDispatch();

  const handleTransformEnd = (groupRef: MutableRefObject<Konva.Group | null>, figure: Figure) => {
    if (!groupRef.current) return;

    const figureNode = groupRef.current;
    const scaleX = figureNode.scaleX();
    const scaleY = figureNode.scaleY();
    figureNode.scaleX(1);
    figureNode.scaleY(1);

    dispatch(
      updateSelectedFigure({
        width: figure.width * scaleX,
        height: figure.height * scaleY,
      }),
    );
  };

  return { handleTransformEnd };
};
