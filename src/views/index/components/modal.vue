<template>
    <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="常见问题"
        positive-text="确认"
        @positive-click="handlePositiveClick">
        <n-list>
            <n-list-item>
                <n-thing title="1.为什么会提示账号或密码错误？" content="请检查账号密码是否正确，账号为手机号，密码为Zepp Life(原小米运动)的登录密码。" />
            </n-list-item>
            <n-list-item>
                <n-thing title="2.为什么会提示操作频繁？" content="因系统限制，每个账号每天只能提交一次，请24小时之后再试。" />
            </n-list-item>
            <n-list-item>
                <n-thing title="3.为什么会提示系统异常？" content="可能是服务器压力过大，请稍后再试。" />
            </n-list-item>
            <n-list-item>
                <n-thing title="4.为什么步数不同步？" content="因系统延迟，同步时间大概为30分钟，请耐心等待。" />
            </n-list-item>
            <n-list-item>
                <n-thing title="5.为什么会APP掉线？" content="因系统需要登录账号进行刷步，请登录30分钟后在登录查看，或者重新提交。" />
            </n-list-item>
        </n-list>
    </n-modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const showModal = ref<boolean>(false)

    function handlePositiveClick() {
        showModal.value = false
    }

    function handleOpenModal() {
        showModal.value = true
    }

    defineExpose({
        handleOpenModal
    })
</script>

<style lang="scss" scoped>
.modal-content {
    font-family: "HarmonyOS_Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;

    .modal-item {
        margin-bottom: 16px;
        font-family: inherit;

        &:last-child {
            margin-bottom: 0;
        }

        .item-title {
            font-size: 15px;
            font-weight: 500;
            color: #303133;
            margin-bottom: 8px;
            font-family: inherit;
        }

        .item-desc {
            font-size: 14px;
            color: #606266;
            line-height: 1.6;
            font-family: inherit;
        }
    }

    &.dark {
        .modal-item {
            .item-title {
                color: #fff;  // 暗色模式下标题颜色
            }

            .item-desc {
                color: #bbb;  // 暗色模式下描述文字颜色
            }
        }
    }
}

:deep(.n-modal-title) {
    font-family: "HarmonyOS_Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

:deep(.n-modal) {
    &.dark {
        background-color: #232324;  // 暗色模式下模态框背景色
        .n-modal-title {
            color: #fff;  // 暗色模式下模态框标题颜色
        }
    }
}
</style>
