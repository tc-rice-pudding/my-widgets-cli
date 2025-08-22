import { computed } from 'vue'
// 类型中文翻译
export const getTypeName = computed(() => {
  return function (opType: string) {
    switch (opType) {
      case '1':
        return '口令'
      case '2':
        return '短信验证码'
      case '3':
        return '数字证书'
      case '20':
        return '人脸'
      case '21':
        return '声纹'
      case '22':
        return '指纹'
      case '23':
        return '虹膜'
      case '30':
        return '微信'
      case '31':
        return '支付宝'
      case '32':
        return '钉钉'
      case '33':
        return '企业微信'
      default:
        return ''
    }
  }
})

// 安全等级中文翻译
export const getLevelName = computed(() => {
  return function (opType: string) {
    switch (opType) {
      case '0':
        return '低'
      case '1':
        return '中'
      case '2':
        return '高'
      default:
        return ''
    }
  }
})