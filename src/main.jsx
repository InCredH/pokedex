import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/index'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <Provider store = {store}>
        <App />
      </Provider>
    </ChakraProvider>,
)
