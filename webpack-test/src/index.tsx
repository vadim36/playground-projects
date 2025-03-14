import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const root = document.getElementById('root')
if (!root) throw new Error('root not found')
const container = createRoot(root)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  }
])
container.render(<RouterProvider router={router}/>)