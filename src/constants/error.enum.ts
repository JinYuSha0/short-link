export enum ErrorCode {
  TIMEOUT = -1,
  BAD_REQUEST = 400,
  INTERNAL_EXCEPTION = 500,
}

export enum ErrorMessage {
  TIMEOUT = '请求超时',
  BAD_REQUEST = '参数错误',
  INTERNAL_EXCEPTION = '系统内部异常',
}
