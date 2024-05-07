import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

//getting access to the react router dom on the whole project

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
);

