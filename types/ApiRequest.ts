export interface UserRequest {
  id: number
  userId: string
}

interface Option {
  id: string
  topicId: string
  key: string
  value: string
}

export interface TopicRequest {
  id: number
  userId: string
  avatar: string
  content: string
  createTime: string
  images: string[]
  options: Option[]
}

export interface TopicParam {
  id: number
  userId: string
  avatar: string
  content: string
  createTime: string
  images: string[]
  options: string[]
}
