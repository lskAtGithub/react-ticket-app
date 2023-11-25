export interface IMessageProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface IMessagePopup {
  info: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
}
