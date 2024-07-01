import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppBrowser } from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppBrowser} />
  </React.StrictMode>,
)
