import React from 'react';
import {StatusBar} from 'react-native';

import Home from './screens/Home';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#000" />
      <Home />
    </>
  );
};

export default App;
