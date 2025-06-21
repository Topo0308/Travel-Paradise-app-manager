
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import GuideHome from './screens/Guide/GuideHome';
import AdminHome from './screens/Admin/AdminHome';
import VisiteurHome from './screens/Visiteur/VisiteurHome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Travel Paradise - Connexion' }}
          />
          <Stack.Screen 
            name="GuideHome" 
            component={GuideHome} 
            options={{ title: 'Guide - Accueil' }}
          />
          <Stack.Screen 
            name="AdminHome" 
            component={AdminHome} 
            options={{ title: 'Administration' }}
          />
          <Stack.Screen 
            name="VisiteurHome" 
            component={VisiteurHome} 
            options={{ title: 'Visiteur - Accueil' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
