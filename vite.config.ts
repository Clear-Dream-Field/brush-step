import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        logger: {
          warn: () => {}  // 禁用所有警告
        },
        quietDeps: true,
        sassOptions: {
          quietDeps: true,
          logger: {
            warn: () => {}  // 禁用所有警告
          }
        }
      }
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略特定的警告
        if (warning.message.includes('legacy')) return
        // 其他警告照常显示
        warn(warning)
      }
    }
  }
})
