export interface IRequestOptions extends RequestInit {}

export interface IRequestErrorParam {
  status?: string
  message?: string
  data?: any
}

export interface IRequestSuccessParam {
  status?: string
  message?: string
  data?: any
}
