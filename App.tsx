// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
// import React from 'react';
// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// // import { StatusBar, View, StyleSheet } from 'react-native';
// // import { SafeAreaProvider } from 'react-native-safe-area-context';
// // import AppContent from './src/AppContent';
// // import NewAppScreen from './src/NewAppScreen';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import AppNavigator from './src/navigation/AppNavigator';
import AppNavigator from './android/app/src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
