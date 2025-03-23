import { Provider } from 'react-redux';
import { store } from './store/store';
import { Canvas } from '@/widgets/canvas';
import { EditFigure } from '@/widgets/edit-figure';
import { Control } from '@/widgets/control';

function App() {
  return (
    <Provider store={store}>
      <Canvas />
      <Control />
      <EditFigure />
    </Provider>
  );
}

export default App;
