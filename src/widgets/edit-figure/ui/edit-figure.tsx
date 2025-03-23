import { EditText } from '@/features/edit-text';
import { useAppDispatch, useAppSelector } from '@/shared/libs';
import styles from './edit-figure.module.scss';
import { EditStyle } from '@/features/edit-style';
import { setSelectedFigure } from '@/entities/figure';

const EditFigure = () => {
  const dispatch = useAppDispatch();
  const selectedFigure = useAppSelector((store) => store.figure.selectedFigure);

  const close = () => {
    dispatch(setSelectedFigure(null));
  };

  return (
    !!selectedFigure && (
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Редактирование фигуры</h2>
          <button className={styles.closeButton} onClick={() => close()}>
            &times;
          </button>
        </div>
        <h3>Редактирование стиля</h3>
        <EditStyle />
        <h3>Редактирование текста</h3>
        <EditText />
      </div>
    )
  );
};

export default EditFigure;
