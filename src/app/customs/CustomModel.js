import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AUTH_CLOSE_NOTIFICATION = 5000
export const notificationTypes = {
  success: 'success',
  warn: 'warn',
  info: 'info',
  error: 'error',
}

export const notificationPosition = {
  // Left
  topLeft: 'top-left',
  bottomLeft: 'bottom-left',

  // Center
  topCenter: 'top-center',
  bottomCenter: 'bottom-center',

  // Right
  topRight: 'top-right',
  bottomRight: 'bottom-right',
}
// export const showNotification = (type, message, position = notificationPosition.topRight ) => {
//     if(type === notificationTypes.info) {
//         toast.info(message, getNotificationParams(position));
//     } else if(type === notificationTypes.success) {
//         toast.success(message, getNotificationParams(position));
//     } else if(type === notificationTypes.warn) {
//         toast.warn(message, getNotificationParams(position));
//     } else if(type === notificationTypes.error) {
//         toast.error(message, getNotificationParams(position));
//     }
// }

export const showToast = {
  info: (message, position = notificationPosition.topRight) => {
    toast.info(message, getNotificationParams(position))
  },
  success: (message, position = notificationPosition.topRight) => {
    toast.success(message, getNotificationParams(position))
  },
  warn: (message, position = notificationPosition.topRight) => {
    toast.warn(message, getNotificationParams(position))
  },
  error: (message, position = notificationPosition.topRight) => {
    toast.error(message, getNotificationParams(position))
  },
}

const getNotificationParams = (position = notificationPosition.topRight) => {
  return {
    position,
    autoClose: AUTH_CLOSE_NOTIFICATION,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }
}
