import type { Prisma } from '@prisma/client'

export interface UserRequest {
  userId: string
}

export interface TopicRequest {
  userId: string
  avatar: string
  content: string
  images: string[]
  options: string[]
}
