import { createRoot } from 'react-dom/client'
import { HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import Store from './store/Redux/ReduxStore.jsx'
import { AuthContextProvider } from './store/Context/AuthContext.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <HashRouter>
  <Provider store={Store}>
  <AuthContextProvider>
    <App/>
    <ToastContainer/>
  </AuthContextProvider>
  </Provider>
  </HashRouter>
)
