import { resError, resSuccess } from '@/app/utils/requestResponse'
import { PrismaClient } from '@prisma/client'

import type { NextRequest } from 'next/server'
import type { TopicRequest } from '../../../../types/ApiRequest'

const prisma = new PrismaClient()

export async function POST(param: NextRequest) {
  try {
    const data = (await param.json()) as TopicRequest
    const topic = await prisma.topic.create({
      data: {
        userId: data.userId,
        avatar: data.avatar,
        content: data.content,
        images: data.images as any,
        options: {
          create: data.options.map((item) => ({
            key: item,
            value: 0,
          })),
        },
      },
      include: {
        options: true,
      },
    })
    return resSuccess({ data: topic })
  } catch (error) {
    resError({ data: error, status: '500' })
  }
}
