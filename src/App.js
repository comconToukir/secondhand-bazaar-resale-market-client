import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import router from './routes/routes/routes';


function App() {
  return (
    <div data-theme="corporate" className='font-poppins'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
