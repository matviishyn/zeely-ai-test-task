import * as React from 'react'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'

import { cn } from '@/lib/utils'

const SHEET_TRANSITION_DURATION = 'duration-200'
const SHEET_TRANSITION_EASING = 'ease-in-out'
const BACKDROP_TRANSITION_DURATION = 'duration-150'

const Sheet = (props: SheetPrimitive.Root.Props) => {
  return <SheetPrimitive.Root {...props} />
}

const SheetContent = ({
  className,
  children,
  ...props
}: SheetPrimitive.Popup.Props) => {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-black/70 transition-opacity',
          BACKDROP_TRANSITION_DURATION,
          'data-ending-style:opacity-0 data-starting-style:opacity-0',
        )}
      />
      <SheetPrimitive.Popup
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex h-full flex-col bg-white shadow-lg transition',
          SHEET_TRANSITION_DURATION,
          SHEET_TRANSITION_EASING,
          'data-ending-style:opacity-0 data-ending-style:translate-x-[2.5rem]',
          'data-starting-style:opacity-0 data-starting-style:translate-x-[2.5rem]',
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={className} {...props} />
}

const SheetTitle = ({ className, ...props }: SheetPrimitive.Title.Props) => {
  return <SheetPrimitive.Title className={className} {...props} />
}

export { Sheet, SheetContent, SheetHeader, SheetTitle }
