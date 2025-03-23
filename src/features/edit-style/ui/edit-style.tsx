import { updateSelectedFigure } from '@/entities/figure';
import { useAppDispatch, useAppSelector } from '@/shared/libs';
import { useCallback } from 'react';
import styles from './edit-style.module.scss';

const EditStyle = () => {
  const dispatch = useAppDispatch();
  const selectedFigure = useAppSelector((state) => state.figure.selectedFigure);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedFigure) return;

      const newValue = e.target.value;
      const field = e.target.name;

      dispatch(
        updateSelectedFigure({
          [field]: newValue,
        }),
      );
    },
    [dispatch, selectedFigure],
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          className={styles.colorPicker}
          type="color"
          id="fill"
          name="fill"
          value={selectedFigure?.fill}
          onChange={handleInputChange}
        />
        <label htmlFor="head">Цвет заливки</label>
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.colorPicker}
          type="color"
          id="stroke"
          name="stroke"
          value={selectedFigure?.stroke}
          onChange={handleInputChange}
        />
        <label htmlFor="stroke">Цвет границы</label>
      </div>
    </div>
  );
};

export default EditStyle;
