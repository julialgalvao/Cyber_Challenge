import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SimulationScreen from '../screens/SimulationScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import LearningPathScreen from '../screens/LearningPathScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type HomeTabParamList = {
  Simulação: undefined;
  Recomendações: { profile: 'Conservador' | 'Moderado' | 'Agressivo' };
  Trilha: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerRight: () => (
          <View style={styles.headerLogoContainer}>
            <Image
              source={require('../assets/logo-xp.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
        ),
        headerRightContainerStyle: { paddingRight: 16 },

        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#333',
        tabBarStyle: {
          backgroundColor: '#FFC107',
          borderTopWidth: 0,
          height: 56
        },
        tabBarActiveBackgroundColor: '#D5A300',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 9
        }
      })}
    >
      <Tab.Screen
        name="Simulação"
        component={SimulationScreen}
        options={{ title: 'Simulação' }}
      />
      <Tab.Screen
        name="Recomendações"
        component={RecommendationScreen}
        options={{ title: 'Recomendação' }}
      />
      <Tab.Screen
        name="Trilha"
        component={LearningPathScreen}
        options={{ title: 'XP Bot' }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    width: 32,
    height: 32
  },
  headerLogoContainer: {
    backgroundColor: '#FFC107',
    padding: 1,
    borderRadius: 7
  }
});