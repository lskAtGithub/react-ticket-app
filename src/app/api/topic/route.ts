import { resError, resSuccess } from '@/app/utils/requestResponse'
import { PrismaClient } from '@prisma/client'

import type { NextRequest } from 'next/server'
import type { TopicParam } from '../../../../types/ApiRequest'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.topic.findMany({
      include: {
        options: true,
      },
    })
    return resSuccess({ data })
  } catch (error) {
    return resError({ data: error, status: '500' })
  }
}

export async function POST(param: NextRequest) {
  const paramCheck = (data: TopicParam)=> {
    if(!data.content) {
      return resError({ data: null, status: '400', message: 'content is required' })
    }
    if(!data.options) {
      return resError({ data: null, status: '400', message: 'options is required' })
    }
  }
  try {
    const data = (await param.json()) as TopicParam
    const topic = await prisma.topic.create({
      data: {
        userId: data.userId,
        avatar: data.avatar,
        content: data.content,
        images: data.images as any,
        createTime: new Date().toLocaleString(),
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
    return resError({ data: error, status: '500' })
  }
}
