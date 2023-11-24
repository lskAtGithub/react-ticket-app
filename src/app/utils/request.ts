import { IRequestOptions, ICommonResult } from '../../../types/Request'

export function request(
  url: string,
  options?: IRequestOptions
): Promise<ICommonResult> {
  let packOptions: IRequestOptions = options || {}
  if (!packOptions.headers) {
    packOptions.headers = {
      'Content-Type': 'application/json',
    }
  }

  return fetch(process.env.API_URL + url, packOptions).then((res) =>
    res.json()
  ) as Promise<ICommonResult>
}
