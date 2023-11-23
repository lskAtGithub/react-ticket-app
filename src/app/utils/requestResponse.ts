import {
  IRequestErrorParam,
  IRequestSuccessParam,
} from '../../../types/Request'
import { NextResponse } from 'next/server'

export function resError(param: IRequestErrorParam): NextResponse {
  return NextResponse.json({
    status: param.status || '400',
    data: param.data || null,
    message: param.message || 'Bad Request',
  })
}

export function resSuccess(param: IRequestSuccessParam): NextResponse {
  return NextResponse.json({
    status: param.status || '200',
    data: param.data || null,
    message: param.message || 'success',
  })
}
