import type { Prisma } from '@prisma/client'

export interface UserRequest {
  id: number
  userId: string
}

export interface TopicRequest {
  id: number
  userId: string
  avatar: string
  content: string
  createTime: string
  images: string[]
  options: string[]
}
