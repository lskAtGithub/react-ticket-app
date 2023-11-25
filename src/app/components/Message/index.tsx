import { useRef } from 'react'
import { IMessageProps, IMessagePopup } from '../../../../types/Message'
import { createRoot } from 'react-dom/client'

const CONTAINER_ID = 'message-container'

function MessageComponent(props: IMessageProps) {
  const { message, type } = props

  return <div className='fixed top-5 z-50'>{message}</div>
}

function MessageBox() {
  let container = document.getElementById(CONTAINER_ID)
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', CONTAINER_ID)
    document.body.appendChild(container)
  }
  return container
}

function renderMessage(props: IMessageProps) {
  const containerRoot = createRoot(MessageBox())
  containerRoot.render(MessageComponent(props))
}

const MessagePopup: IMessagePopup = {
  info: (message) => {
    renderMessage({ message, type: 'info' })
  },
  success: (message) => {
    renderMessage({ message, type: 'success' })
  },
  warning: (message) => {
    renderMessage({ message, type: 'warning' })
  },
  error: (message) => {
    renderMessage({ message, type: 'error' })
  },
}

export default MessagePopup
