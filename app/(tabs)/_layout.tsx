import { Tabs } from 'expo-router';
import { Stethoscope, Chrome as Home, User, Pill } from 'lucide-react-native';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null; // Will be handled by auth guard
  }

  const getTabScreens = () => {
    switch (user.role) {
      case 'patient':
        return (
          <>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="symptoms"
              options={{
                title: 'Symptoms',
                tabBarIcon: ({ size, color }) => (
                  <Stethoscope size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="records"
              options={{
                title: 'Records',
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
          </>
        );
      case 'doctor':
        return (
          <>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="patients"
              options={{
                title: 'Patients',
                tabBarIcon: ({ size, color }) => (
                  <User size={size} color={color} />
                ),
              }}
            />
          </>
        );
      case 'pharmacy':
        return (
          <>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ size, color }) => (
                  <Home size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="inventory"
              options={{
                title: 'Inventory',
                tabBarIcon: ({ size, color }) => (
                  <Pill size={size} color={color} />
                ),
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}>
      {getTabScreens()}
    </Tabs>
  );
}