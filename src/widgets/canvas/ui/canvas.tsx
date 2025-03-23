import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch, useAppSelector } from '@/shared/libs';
import { addFigure, Figure, FigureShape, setSelectedFigure } from '@/entities/figure';
import useZoom from '../libs/hooks/useZoom';
import { uid } from 'uid';
import useResize from '../libs/hooks/useResize';
import { FigureTransformer, useFigureTransform } from '@/features/figure-transform';
import { useSelectFigure } from '@/features/select-figure';

const Canvas = () => {
  const dispatch = useAppDispatch();

  const figures = useAppSelector((store) => store.figure.figures);

  const { width, height } = useResize();
  const { stageRef, handleWheel } = useZoom();

  const { handleFigureClick } = useSelectFigure();
  const { handleTransformEnd: handleFigureTransformEnd } = useFigureTransform();

  const handleClick = () => {
    dispatch(setSelectedFigure(null));
  };

  const handleDblClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();

    if (!stage) return;

    const point = stage.getPointerPosition();
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    if (!point) return;

    dispatch(
      addFigure({
        id: uid(16),
        width: 100,
        height: 100,
        x: (point?.x - stage.x()) / scaleX,
        y: (point?.y - stage.y()) / scaleY,
        rotation: 0,
        stroke: '#000000',
        fill: '#ffffff',
        html: '',
      }),
    );
  };

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      draggable
      onClick={handleClick}
      onDblClick={handleDblClick}
      onWheel={handleWheel}
    >
      <Layer>
        {figures.map((figure: Figure) => (
          <FigureShape
            key={figure.id}
            figure={figure}
            handleClick={handleFigureClick}
            FigureTransformer={FigureTransformer}
            handleTransformEnd={handleFigureTransformEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
