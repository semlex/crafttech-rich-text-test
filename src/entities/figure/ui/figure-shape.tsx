import html2canvas from 'html2canvas';
import Konva from 'konva';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch, useAppSelector } from '@/shared/libs';
import { Figure, setSelectedFigure } from '@/entities/figure';
import { HtmlText } from '@/shared/ui';
import { FigureTransformer } from '@/features/figure-transform';

type FigureShapeProps = {
  figure: Figure;
  handleTransformEnd: (groupRef: MutableRefObject<Konva.Group | null>, figure: Figure) => void;
};

const FigureShape = (props: FigureShapeProps) => {
  const { figure, handleTransformEnd } = props;
  const { x, y, width, height, rotation, fill, stroke, html, id } = figure;

  const dispatch = useAppDispatch();

  const selectedFigure = useAppSelector((state) => state.figure.selectedFigure);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const renderImage = useCallback(async () => {
    const htmlText = htmlRef.current;

    if (htmlText) {
      if (htmlText) {
        const canvas = await html2canvas(htmlRef.current, {
          backgroundColor: 'transparent',
          useCORS: true,
        });
        const shape = new Konva.Image({
          x: 1,
          y: 1,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        });

        if (imageRef.current) {
          imageRef.current.image(canvas);
        } else {
          groupRef.current?.add(shape);
          imageRef.current = shape;
        }
      }
    }
  }, []);

  useEffect(() => {
    renderImage();
  }, [html, width, stroke, height, fill, rotation, renderImage]);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      return;
    }

    clickTimeoutRef.current = setTimeout(() => {
      dispatch(setSelectedFigure(figure));
      clickTimeoutRef.current = null;
    }, 200);
  };

  return (
    <>
      <Group
        x={x}
        y={y}
        onClick={handleClick}
        rotation={rotation}
        onTransformEnd={() => handleTransformEnd(groupRef, figure)}
        ref={groupRef}
        draggable
      >
        <Rect width={width} height={height} fill={fill} stroke={stroke} />
      </Group>
      {selectedFigure?.id === id && <FigureTransformer groupRef={groupRef} figure={figure} />}
      <Html>
        <HtmlText width={width - 1} height={height - 1} html={html} ref={htmlRef} />
      </Html>
    </>
  );
};

export default FigureShape;
