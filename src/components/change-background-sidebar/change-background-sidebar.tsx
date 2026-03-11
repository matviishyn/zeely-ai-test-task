import { X } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui'
import {
  useBackgroundStore,
  useBackgroundCleanup,
} from '@/store/use-background-store'
import { PromptEditor } from './prompt-editor'
import { GenerateButton } from './generate-button'
import { GeneratingThumbnail } from './generating-thumbnail'
import { CompletedThumbnail } from './completed-thumbnail'

export const ChangeBackgroundSidebar = () => {
  const isOpen = useBackgroundStore((s) => s.isOpen)
  const close = useBackgroundStore((s) => s.close)
  const backgrounds = useBackgroundStore((s) => s.backgrounds)
  const selectedId = useBackgroundStore((s) => s.selectedId)
  const selectBackground = useBackgroundStore((s) => s.selectBackground)
  useBackgroundCleanup()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent className="w-[400px]">
        <div className="flex-1 overflow-y-auto px-5 py-8">
          <SheetHeader className="pb-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-[22px] font-bold">
                Change background
              </SheetTitle>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="size-8 rounded-full flex items-center justify-center hover:bg-gray-light transition-colors cursor-pointer"
              >
                <X className="size-6" />
              </button>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Background idea</span>
              <PromptEditor />
            </div>

            <GenerateButton />

            <div className="flex flex-col gap-3 mt-2">
              <span className="text-sm font-semibold">Your backgrounds</span>
              <div className="grid grid-cols-3 gap-3">
                {backgrounds.map((item) =>
                  item.status === 'generating' ? (
                    <GeneratingThumbnail key={item.id} item={item} />
                  ) : (
                    <CompletedThumbnail
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedId}
                      onSelect={() => selectBackground(item.id)}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
