import { cn } from '@/lib/utils'
import type { CompletedBackground } from '@/types/background'
import { THUMBNAIL_BASE } from './constants'

interface CompletedThumbnailProps {
  item: CompletedBackground
  isSelected: boolean
  onSelect: () => void
}

export const CompletedThumbnail = ({
  item,
  isSelected,
  onSelect,
}: CompletedThumbnailProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select background${item.isDefault ? ' (default)' : ''}`}
      aria-pressed={isSelected}
      className={cn(
        THUMBNAIL_BASE,
        'group cursor-pointer transition-transform duration-200 hover:scale-102',
        isSelected && 'ring-2 ring-black',
      )}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <img
        src={item.imageUrl}
        alt="Generated background"
        loading="lazy"
        className="h-full w-full rounded-[16px] object-cover"
      />
      {item.isDefault && (
        <span className="absolute top-2 left-2 rounded-[5px] text-[10px] font-bold uppercase bg-white text-[#404040] pt-[5px] pb-[3px] px-[6px] border border-black/5">
          Default
        </span>
      )}
    </div>
  )
}
