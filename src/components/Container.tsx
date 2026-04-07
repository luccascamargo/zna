import { cn } from '@/lib/utils'

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('w-full max-w-373 px-2 sm:px-4 mx-auto', className)}>{children}</div>
}
