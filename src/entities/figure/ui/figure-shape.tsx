import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Group, Rect } from 'react-konva';
import html2canvas from 'html2canvas';
import { Html } from 'react-konva-utils';
import { Figure } from '../model/types';
import { HtmlText } from '@/shared/ui';
import 'react-quill/dist/quill.snow.css';

type FigureShapeProps = {
  figure: Figure;
  isSelected: boolean;
  handleClick: (event: Konva.KonvaEventObject<MouseEvent>, figure: Figure) => void;
  handleTransformEnd: (groupRef: MutableRefObject<Konva.Group | null>, figure: Figure) => void;
  FigureTransformer: (props: {
    groupRef: MutableRefObject<Konva.Group | null>;
    figure: Figure;
  }) => JSX.Element;
};

const FigureShape = (props: FigureShapeProps) => {
  const { figure, isSelected, handleClick, handleTransformEnd, FigureTransformer } = props;
  const { x, y, width, height, rotation, fill, stroke, html } = figure;

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Group
        x={x}
        y={y}
        onClick={(e) => handleClick(e, figure)}
        rotation={rotation}
        onTransformEnd={() => handleTransformEnd(groupRef, figure)}
        ref={groupRef}
        draggable
      >
        <Rect width={width} height={height} fill={fill} stroke={stroke} />
      </Group>
      {isSelected && <FigureTransformer groupRef={groupRef} figure={figure} />}
      <Html>
        <HtmlText width={width - 1} height={height - 1} html={html} ref={htmlRef} />
      </Html>
    </>
  );
};

export default FigureShape;
