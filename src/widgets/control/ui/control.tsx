import styles from './control.module.scss';

const Control = () => {
  return (
    <div className={styles.container}>
      <h3>Дважды кликните, чтобы добавить фигуру</h3>
      <h3>Кликните на фигуру, чтобы отредактировать её</h3>
    </div>
  );
};

export default Control;
