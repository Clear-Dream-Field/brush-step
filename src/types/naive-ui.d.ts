import type { MessageApi, DialogApi, NotificationApi, LoadingBarApi } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApi
    $dialog: DialogApi
    $notification: NotificationApi
    $loadingBar: LoadingBarApi
  }
}

declare module 'naive-ui' {
  export * from 'naive-ui/es/components'
  export const useMessage: () => MessageApi
  export const useDialog: () => DialogApi
  export const useNotification: () => NotificationApi
  export const useLoadingBar: () => LoadingBarApi
  export const createDiscreteApi: (apis: Array<'message' | 'dialog' | 'notification' | 'loadingBar'>) => {
    message: MessageApi
    dialog: DialogApi
    notification: NotificationApi
    loadingBar: LoadingBarApi
  }
} 