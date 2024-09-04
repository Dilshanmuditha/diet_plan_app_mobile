import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useCallback} from 'react';
import Routes from './src/navigation/Routes';
import {AuthProvider} from './AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
