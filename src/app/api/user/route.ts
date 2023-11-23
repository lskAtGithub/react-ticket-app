import { PrismaClient } from '@prisma/client'
import { resError, resSuccess } from '@/app/utils/requestResponse'

import type { NextRequest } from 'next/server'
import type { UserRequest } from '../../../../types/ApiRequest'



const prisma = new PrismaClient()

export async function POST(params: NextRequest) {
  try {
    const { userId } = (await params.json()) as UserRequest
    if (!userId) {
      return resError({})
    }
    let user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          userId: userId,
        },
      })
    }
    return resSuccess({ data: user })
  } catch (error) {
    return resError({
      message: 'Internal error',
      status: '500',
      data: error,
    })
  }
}
