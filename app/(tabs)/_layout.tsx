import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs   
      screenOptions={{
      tabBarActiveTintColor: '#BE185D',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 70,
        paddingBottom: 10,
      },
    }}>
      <Tabs.Screen
        name="escolas"
        options={{
          title: 'Escolas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="turmas"
        options={{
          title: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}