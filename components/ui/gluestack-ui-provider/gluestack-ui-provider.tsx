'use client'

import { config } from '@gluestack-ui/config'
import { GluestackUIProvider as Provider } from '@gluestack-ui/themed'

export function GluestackUIProvider({ children }: any) {
  return (
    <Provider config={config}>
      {children}
    </Provider>
  )
}