import { cn } from '@/lib/utils'
import type { GeneratingBackground } from '@/types/background'
import { THUMBNAIL_BASE } from './constants'

const CIRCLE_RADIUS = 24
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

interface GeneratingThumbnailProps {
  item: GeneratingBackground
}

export const GeneratingThumbnail = ({ item }: GeneratingThumbnailProps) => {
  const strokeOffset = CIRCLE_CIRCUMFERENCE * (1 - item.progress / 100)

  return (
    <div
      className={cn(
        THUMBNAIL_BASE,
        'bg-black flex flex-col items-center justify-center pb-2',
      )}
    >
      <div className="relative h-16 w-16">
        <svg
          className="h-16 w-16 -rotate-90"
          viewBox="0 0 56 56"
          role="img"
          aria-label={`Generating: ${item.progress}%`}
        >
          <circle
            cx="28"
            cy="28"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#3a3a3a"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#5BF0A5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-300 ease-linear"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[14px] font-medium text-white">
          {item.progress}%
        </span>
      </div>
      <span className="absolute bottom-0 left-0 right-0 pb-2 text-center text-[12px] font-semibold text-white">
        {item.timeLeft}
      </span>
    </div>
  )
}
