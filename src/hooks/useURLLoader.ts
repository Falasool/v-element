import axios from 'axios'
import { reactive, toRefs } from 'vue'

interface IResult<T> {
  result: null | T
  loading: boolean
  error: any
}

const useURLLoader = <T = any>(url: string) => {
  const data: IResult<T> = reactive({
    /*
     * 返回结果
     * loading状态
     * 返回错误
     */
    result: null,
    loading: true,
    error: null,
  })
  axios
    // 发送 get 请求
    .get(url)
    // 请求成功
    .then((rawData) => {
      data.result = rawData.data
    })
    // 请求失败
    .catch((e) => {
      data.error = e
    })
    // 成功失败都触发
    .finally(() => {
      // 加载完成
      data.loading = false
    })
  return toRefs(data)
}

export default useURLLoader
