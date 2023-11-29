import { NextRequest } from 'next/server'
import { resError, resSuccess } from '@/app/utils/requestResponse'
import { PrismaClient } from '@prisma/client'

import type { RecordParam } from '../../../../types/ApiRequest'

const prisma = new PrismaClient()

function checkParam(data: RecordParam) {
  if (!data.choice || !data.topicId || !data.userId) {
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  try {
    const param = (await request.json()) as RecordParam
    if (!checkParam(param)) return resError({})
    prisma.record.create({
      data: {
        userId: param.userId,
        choice: param.choice,
        topicId: param.topicId,
      },
    })
    return resSuccess({})
  } catch (error) {
    return resError({ data: error, status: '500' })
  }
}
