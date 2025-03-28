import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import App from './comps/Animation.jsx';
//import App from './animation/CSSTransitionDemo';
import App from './animation/DragDropImageLabel';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
