<template>
    <div class="index-container" :class="{ 'dark': isDark }">
        <info-page></info-page>
        <msg-page></msg-page>
    </div>
</template>

<script setup lang="ts">
import InfoPage from './components/info.vue'
import MsgPage from './components/msg.vue'
import { useThemeStore } from '@/stores/theme'  
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<style lang="scss" scoped>
.index-container {
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    position: relative;
    z-index: 1;

    > * {
        width: 640px;
    }
}

@media (max-width: 768px) {
    .index-container {
        padding: 10px;
        gap: 10px;

        > * {
            width: 100%;
        }
    }
}
</style>
