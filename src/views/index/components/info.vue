<template>
    <div class="info-page" :class="{ 'dark': themeStore.isDark }">
        <div class="info-page-card">
            <!-- 顶部 -->
            <div class="info-page-title">
                <span>刷步助手</span>
            </div>
            <!-- 每日一言 -->
            <div class="avatar">
                <h1>每日刷步</h1>
                <div class="yiyan">
                    <div class="yiyan-prefix" @click="themeStore.toggleTheme">
                        <i class="theme-icon">{{ themeStore.isDark ? '🌙' : '☀️' }}</i>
                        一言
                    </div>
                    <div class="yiyan-content">
                        <p class="yiyan-text">{{ yiyan }}</p>
                        <p class="yiyan-from" v-if="yiyanFrom">—— {{ yiyanFrom }}</p>
                    </div>
                </div>
            </div>
            <!-- 输入框 -->
            <div class="infos">
                <n-space vertical>
                    <n-input-group>
                        <n-input-group-label class="input-title">用户名</n-input-group-label>
                        <n-input
                            size="medium"
                            type="text"
                            v-model:value="formValue.user"
                            placeholder="Zepp Life账号(原小米运动)" />
                    </n-input-group>
                    <n-input-group>
                        <n-input-group-label class="input-title">密 码</n-input-group-label>
                        <n-input
                            type="password"
                            show-password-on="mousedown"
                            v-model:value="formValue.password"
                            placeholder="Zepp Life密码(原小米运动)" />
                    </n-input-group>
                    <n-input-group>
                        <n-input-group-label class="input-title">步 数</n-input-group-label>
                        <n-input
                            show-password-on="mousedown"
                            v-model:value="formValue.step"
                            placeholder="1~98800" />
                    </n-input-group>
                </n-space>
                <!-- 确定按钮 -->
                <n-button
                    type="primary"
                    :loading="loading"
                    class="btn"
                    @click="handleClick">
                    提交任务
                </n-button>
            </div>
            <!-- 常见问题 -->
            <div class="issue">
                <span @click="qsClick">常见问题</span>
                <span>|</span>
                <span @click="apiClick">API调用</span>
            </div>
            <!-- 模态框 -->
            <modalVal ref="modalRef"></modalVal>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import modalVal from './modal.vue'
    import { useMessage } from 'naive-ui'
    import { submitStep } from '@/api/index' 
    import axios from 'axios'
    import { useThemeStore } from '@/stores/theme'
    import type { FormValue } from '@/types/index'

    const themeStore = useThemeStore()
    const message = useMessage()
    const modalRef = ref<InstanceType<typeof modalVal> | null>(null)
    const loading = ref<boolean>(false)
    const formValue = ref<FormValue>({
        user: '',
        password: '',
        step: ''
    })
    const yiyan = ref<string>('')
    const yiyanFrom = ref<string>('')

    async function handleClick() {
        loading.value = true
        if (!formValue.value.user || !formValue.value.password || !formValue.value.step) {
            message.warning('内容输入不完整')
            loading.value = false
            return
        }
        if (Number(formValue.value.step) > 98800) {
            message.warning('步数最大不超过98800')
            loading.value = false
            return
        }
        try {
            const result = await submitStep({
                phone: formValue.value.user,
                password: formValue.value.password,
                steps: Number(formValue.value.step)
            })
            
            message.warning(result.mess)
            
        } catch (error: any) {
            message.warning(error.mess || '获取数据失败，请稍后重试')
        } finally {
            loading.value = false
        }
    }

    function qsClick() {
        modalRef.value?.handleOpenModal()
    }

    function apiClick() {
        message.warning('开发中...')
    }

    async function getYiyan() {
        try {
            const { data } = await axios.get('https://v1.hitokoto.cn/')
            yiyan.value = data.hitokoto
            yiyanFrom.value = data.from
        } catch (error) {
            yiyan.value = '生活明朗，万物可爱'
            yiyanFrom.value = '一言'
        }
    }

    onMounted(() => {
        getYiyan()
    })
</script>

<style lang="scss" scoped>
    .info-page {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: "HarmonyOS_Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;

        &-title {
            text-align: center;
            font-size: 20px;
            height: 42px;
            line-height: 42px;
            padding-left: 10px;
            border-bottom: 1px solid #ebebeb;
            border-radius: 24px 24px 0 0;
            font-family: inherit;
        }

        &-card {
            background-color: #fff;
            border-radius: 24px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }

        .avatar {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;

            .img {
                width: 80px;
                height: 80px;
                border: 1px solid #fff;
                border-radius: 50%;
                box-shadow: 0 0 3px #aaa;
                padding: 3px;
                margin-bottom: 6px;
            }

            h1 {
                font-size: 18px;
                color: #333;
                margin: 0;
                font-family: inherit;
            }

            .yiyan {
                margin-top: 10px;
                display: flex;
                align-items: flex-start;
                padding: 0 20px;
                font-family: inherit;
                transition: all 0.3s ease;

                &-prefix {
                    font-size: 14px;
                    color: #fff;
                    background-color: #1a73e8;
                    padding: 2px 8px;
                    border-radius: 4px;
                    margin-right: 10px;
                    flex-shrink: 0;
                }

                &-content {
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 4px 8px;
                }

                &-text {
                    font-size: 14px;
                    color: #666;
                    line-height: 1.5;
                    font-style: italic;
                    margin: 0;
                    word-break: break-all;
                    white-space: normal;
                }

                &-from {
                    font-size: 12px;
                    color: #999;
                    line-height: 1.5;
                    flex-shrink: 0;
                }

                &:hover {
                    .yiyan-text {
                        color: #1a73e8;
                    }
                    .yiyan-from {
                        color: #666;
                    }
                }
            }
        }

        .infos {
            padding: 0 20px 20px;

            .input-title {
                width: 80px;
                height: 40px;
                background-color: #f7f8fa;
                color: #4c4c4c;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #e4e7ed;
                border-right: none;
                font-size: 14px;
                font-family: inherit;
                font-weight: 500;
                transition: all 0.3s ease;
                border-radius: 20px 0 0 20px;
            }

            .n-input-group {
                margin-bottom: 15px;
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.3s ease;
                border: 1px solid #e4e7ed;
                background-color: #fff;

                .n-input {
                    background-color: #fff;
                    font-family: inherit;

                    :deep(.n-input__input) {
                        height: 40px;
                        font-size: 14px;
                        color: #333;
                    }

                    &:hover {
                        background-color: #fff;
                    }
                }

                &:hover {
                    border-color: #b2b8c2;
                    .input-title {
                        border-color: #b2b8c2;
                    }
                }

                &:focus-within {
                    border-color: #409eff;
                    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
                    .input-title {
                        border-color: #409eff;
                        color: #409eff;
                    }
                }
            }

            .btn {
                margin-top: 20px;
                width: 100%;
                height: 40px;
                font-size: 15px;
                font-weight: 500;
                border-radius: 20px;
                transition: all 0.3s ease;
                font-family: inherit;
                letter-spacing: 1px;
                background-color: #1a73e8 !important;
                border: none !important;
                outline: none !important;
                color: #fff !important;
                box-shadow: 0 2px 6px rgba(26, 115, 232, 0.4) !important;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.5) !important;
                    background-color: #1557b0 !important;
                }

                &:active {
                    transform: translateY(0);
                    background-color: #174ea6 !important;
                    box-shadow: 0 2px 4px rgba(26, 115, 232, 0.4) !important;
                }

                &:focus {
                    box-shadow: 0 2px 6px rgba(26, 115, 232, 0.4) !important;
                    border: none !important;
                    outline: none !important;
                }
            }
        }

        .issue {
            height: 42px;
            line-height: 42px;
            border-top: 1px solid #ebebeb;
            font-size: 14px;
            text-align: center;
            border-radius: 0 0 24px 24px;
            color: #666;
            font-family: inherit;
            
            span {
                padding: 0 10px;
                cursor: pointer;
                font-family: inherit;

                &:hover {
                    color: #1a73e8;
                }

                &:nth-child(2) {
                    color: #e8e8e8;
                    cursor: default;
                }
            }
        }

        &.dark {
            .info-page-card {
                background-color: #232324;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
            }

            .info-page-title {
                color: #fff;
                border-bottom-color: #2d2d30;
            }

            .avatar {
                h1 {
                    color: #fff;
                }

                .yiyan {
                    &-text {
                        color: #bbb;
                    }

                    &-from {
                        color: #888;
                    }

                    &:hover {
                        .yiyan-text {
                            color: #1a73e8;
                        }
                        .yiyan-from {
                            color: #999;
                        }
                    }
                }
            }

            .infos {
                .input-title {
                    background-color: #2d2d30;
                    color: #bbb;
                    border-color: #2d2d30;
                }

                .n-input-group {
                    border-color: #2d2d30;
                    background-color: #18181c;

                    .n-input {
                        background-color: #18181c;

                        :deep(.n-input__input) {
                            color: #fff;

                            &::placeholder {
                                color: #666;
                            }
                        }
                    }

                    &:hover {
                        border-color: #3d3d40;
                        .input-title {
                            border-color: #3d3d40;
                        }
                    }

                    &:focus-within {
                        border-color: #1a73e8;
                        .input-title {
                            border-color: #1a73e8;
                            color: #1a73e8;
                        }
                    }
                }
            }

            .issue {
                border-top-color: #2d2d30;
                color: #bbb;

                span {
                    &:hover {
                        color: #1a73e8;
                    }

                    &:nth-child(2) {
                        color: #2d2d30;
                    }
                }
            }
        }

        .yiyan-prefix {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;

            .theme-icon {
                font-style: normal;
                font-size: 12px;
            }
        }
    }

    @media (max-width: 768px) {
        .info-page {
            padding: 0;
            position: relative;

            &-card {
                width: 100%;
            }

            .infos {
                padding: 15px;
            }
        }
    }
</style>
