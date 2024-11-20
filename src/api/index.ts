import type { StepParams, StepResponse } from '../types/index'
import request from '@/service/request'

// 提交步数 - 修改返回类型定义
export const submitStep = (params: StepParams): Promise<StepResponse> => {
    return request.get('/api/step', { params })
}
