import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn } from '@/lib/utils'

export const Button = ({ className, ...props }: ButtonPrimitive.Props) => {
  return (
    <ButtonPrimitive
      className={cn(
        'inline-flex shrink-0 items-center justify-center outline-none select-none disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
