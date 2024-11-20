<template>
    <div class="msg-page">
        <div class="msg-page-card" :class="{ 'dark': isDark }">
            <div class="msg-page-title">
                <span>使用说明</span>
            </div>
            <div class="msg-page-info">
                <div class="info-item">
                    <div class="item-number">1</div>
                    <div class="item-content">从应用商店下载Zepp Life/小米运动,打开软件通过手机号注册登录</div>
                </div>
                <div class="info-item">
                    <div class="item-number">2</div>
                    <div class="item-content">登录之后，点击我的->第三方接入->绑定需要同步的第三方平台</div>
                </div>
                <div class="info-item">
                    <div class="item-number">3</div>
                    <div class="item-content">回到网页版，填写相关信息，提交步数即可同步至你绑定的所有平台</div>
                </div>
                <div class="info-item">
                    <div class="item-number">4</div>
                    <div class="item-content">叠加模式通过算法自动计算每半小时需要增加的步数，直至用户设定的最大步数为止</div>
                </div>
                <div class="info-item">
                    <div class="item-number">5</div>
                    <div class="item-content">因系统计划任务每间隔30分钟执行一次，故步数可能存在30分钟左右的延迟</div>
                </div>
                <div class="info-item">
                    <div class="item-number">6</div>
                    <div class="item-content">请勿重复提交，24小时内尽量只提交一次</div>
                </div>
            </div>
            <div class="msg-page-footer">
                <span>Copyright © 2024 刷步助手</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<style lang="scss" scoped>
    .msg-page {
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

            &.dark {
                background-color: #232324;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);

                .msg-page-title {
                    color: #fff;
                    border-bottom-color: #2d2d30;
                }

                .msg-page-info {
                    .info-item {
                        background: #2d2d30;

                        .item-content {
                            color: #bbb;
                        }
                    }
                }

                .msg-page-footer {
                    border-top-color: #2d2d30;
                    color: #bbb;
                }
            }
        }

        &-info {
            padding: 20px;

            .info-item {
                display: flex;
                align-items: flex-start;
                padding: 15px;
                margin-bottom: 15px;
                background: #f9f9f9;
                border-radius: 20px;
                transition: all 0.3s ease;
                font-family: inherit;

                &:hover {
                    transform: translateX(5px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .item-number {
                    width: 28px;
                    height: 28px;
                    background: #1a73e8;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    margin-right: 15px;
                    flex-shrink: 0;
                    font-family: inherit;
                }

                .item-content {
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                    flex: 1;
                    font-family: inherit;
                }
            }
        }

        &-footer {
            height: 42px;
            line-height: 42px;
            border-top: 1px solid #ebebeb;
            font-size: 14px;
            text-align: center;
            border-radius: 0 0 24px 24px;
            color: #666;
            font-family: inherit;
        }
    }

    @media (max-width: 768px) {
        .msg-page {
            padding: 0;
            position: relative;
        }
        .msg-page-info {
            padding: 15px;
            
            .info-item {
                padding: 12px;
                margin-bottom: 10px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
