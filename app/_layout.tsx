import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { makeServer } from '../mocks/server'

if (typeof window !== 'undefined') {
  makeServer()
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider  config={config}>
        <Stack screenOptions={{ headerShown: false }} />
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}