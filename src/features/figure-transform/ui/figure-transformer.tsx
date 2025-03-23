import { Figure } from '@/entities/figure';
import Konva from 'konva';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

type FigureTransformer = {
  groupRef: MutableRefObject<Konva.Group | null>;
  figure: Figure;
};

const FigureTransformer = (props: FigureTransformer) => {
  const { groupRef, figure } = props;
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [groupRef, figure.width, figure.height]);

  return <Transformer ref={transformerRef} />;
};

export default FigureTransformer;
