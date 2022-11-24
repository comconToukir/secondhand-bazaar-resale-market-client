import { RouterProvider } from 'react-router-dom';

import router from './routes/routes/routes';

function App() {
  return (
    <div data-theme="corporate">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
