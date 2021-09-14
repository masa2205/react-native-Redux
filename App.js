import React from 'react';
import { Provider } from 'react-redux'; 
import store from './store/' 
import IncrementButton from './src/components/IncrementButton';

export default App = () => {

  return(
      <Provider store={store}>
        <IncrementButton />
      </Provider>
  )
}