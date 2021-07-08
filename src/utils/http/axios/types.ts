export interface RequestOptions {
  // post 请求时添加参数到 url
  joinParamsToUrl?: boolean;
  // 是否格式化提交参数时间
  formatDate?: boolean;
  // 是否对返回数据进行处理
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean;
  // 请求接口地址
  apiUrl?: string;
  // 是否添加时间戳
  joinTime?: boolean;
  // 是否忽略重复请求
  ignoreCancelToken?: boolean;
  // 是否在请求头中添加令牌
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface UploadFileParams {
  // 额外的参数
  data?: Recordable;
  // 接口对应的文件字段
  name?: string;
  file: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
}
