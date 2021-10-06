import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/app-router';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
