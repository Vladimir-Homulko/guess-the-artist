import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Layout from './layouts/Layout';
import Login from './pages/Login';
import GamePage from './pages/GamePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Login />,
        index: true
      },
      {
        element: <GamePage />,
        path: '/game',
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
