declare module 'pinia-plugin-persistedstate' {
  import type { PiniaPluginContext } from 'pinia'
  const plugin: (options?: any) => (context: PiniaPluginContext) => void
  export default plugin
} 