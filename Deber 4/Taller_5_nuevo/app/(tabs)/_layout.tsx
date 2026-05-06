import { Tabs } from 'expo-router';
import { useAuth } from '@shared/context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PRIMARY = '#0C2340';
const WHITE = '#FFFFFF';

export default function TabsLayout() {
  const { signOut } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: PRIMARY },
        headerTintColor: WHITE,
        tabBarActiveTintColor: PRIMARY,
        headerRight: () => (
          <TouchableOpacity onPress={signOut} style={{ marginRight: 16 }}>
            <MaterialCommunityIcons name="logout-variant" size={26} color={WHITE} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Proyectos',
          tabBarLabel: 'Proyectos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registro"
        options={{
          title: 'Registrar',
          tabBarLabel: 'Registrar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}