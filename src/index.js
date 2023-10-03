import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './Route';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>

);
