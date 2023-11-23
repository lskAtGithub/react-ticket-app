interface IRequestOptions extends RequestInit {}

export function request<T>(url: string, options?: IRequestOptions): Promise<T> {
  let packOptions: IRequestOptions = options || {}
  if(!packOptions.headers) {
    packOptions.headers = {
      "Content-Type": "application/json",
    }
  }
  
  return fetch(process.env.API_URL + url, packOptions).then((res) => res.json()) as Promise<T>
}
