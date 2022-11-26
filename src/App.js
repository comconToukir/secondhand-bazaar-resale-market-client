import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from './routes/routes/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-theme="corporate">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
