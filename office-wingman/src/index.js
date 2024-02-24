import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MailReview from './content/mail/MailReview';
import Meetings from './content/meetings/Meetings';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './content/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/',
        element:<Dashboard/>
      },
      {
        path: `/mail-review`,
        element: <MailReview />
      },
      {
        path: `/meetings`,
        element: <Meetings />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

