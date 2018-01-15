import React from 'react';
import { AppRegistry } from 'react-native';
import RootNavigator from './RootNavigator';

const App = () => (
  <RootNavigator />
);

export default App;

AppRegistry.registerComponent('app', () => App);
