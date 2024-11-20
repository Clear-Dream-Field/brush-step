declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'naive-ui' {
  const content: any
  export default content
}

declare module 'date-fns' {
  const content: any
  export default content
}

declare module 'date-fns-tz' {
  const content: any
  export default content
} 