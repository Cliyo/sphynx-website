import { toast } from 'react-toastify'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

export const notify = (message: string, type: NotificationType) => {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message)
      break
    case 'info':
      toast.info(message)
      break
    case 'warning':
      toast.warning(message)
      break
    default:
      toast(message)
      break
  }
}
