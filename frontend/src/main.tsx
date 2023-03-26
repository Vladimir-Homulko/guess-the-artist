import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { GAME_PATH, HOME_PATH } from './common/constants';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        index: true,
      },
      {
        element: <GamePage />,
        path: GAME_PATH,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
