import React from 'react';
import { Provider } from 'react-redux'; 
import store, {persistor} from './store/' //++
import IncrementButton from './src/components/IncrementButton';
import {PersistGate} from 'redux-persist/integration/react' //++

export default App = () => {
  return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IncrementButton />
        </PersistGate>
      </Provider>
  )
}