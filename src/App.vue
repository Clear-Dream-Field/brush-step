<template>
    <n-config-provider :theme="isDark ? darkTheme : null">
        <n-message-provider>
            <div class="app-container" :class="{ 'dark': isDark }">
                <div class="app-background"></div>
                <router-view></router-view>
            </div>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme' 
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    min-height: 100vh;
    font-family: "HarmonyOS_Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.app-container {
    min-height: 100vh;
    position: relative;
    transition: all 0.3s ease;

    .app-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f6f7;
        background-image: url('@/assets/bg.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        z-index: -1;
        transition: all 0.3s ease;
    }

    &.dark {
        .app-background {
            background-color: #17171a;
        }
    }
}

@media (max-width: 768px) {
    .app-container {
        .app-background {
            background-image: none;  
        }

        &.dark .app-background {
            background-color: #17171a;
        }
    }
}
</style>
