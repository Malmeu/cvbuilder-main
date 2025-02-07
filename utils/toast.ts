import toast from 'react-hot-toast'

interface ToastOptions {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export const showToast = ({ title, description, variant = 'default' }: ToastOptions) => {
  if (variant === 'destructive') {
    toast.error(`${title} - ${description}`)
  } else {
    toast.success(`${title} - ${description}`)
  }
}
