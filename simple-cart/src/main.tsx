import ReactDOM from 'react-dom'

import App from './App'
import { CheckoutProvider } from './context/CheckoutContext'

import './index.css'

ReactDOM.render(
<CheckoutProvider>
    <App />
</CheckoutProvider>
, document.getElementById('root'))
