import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface UserRequest {
  userId: string
}

const prisma = new PrismaClient

export async function POST(params: NextRequest) {
  try {
    const { userId } = (await params.json()) as UserRequest
    if (!userId) {
      return NextResponse.json({
        message: 'Bad Request',
        status: '400',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })

    if(!user) {
      await prisma.user.create({
        data: {
          userId: userId
        }
      })
    }



    return NextResponse.json({
      status: '200',
      user,
    })
  } catch (error) {
    console.error('🚀 ~ file: route.ts:12 ~ POST ~ error:', error)
    return NextResponse.json({
      message: 'Internal error',
      status: '500',
    })
  }
}
