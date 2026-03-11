import { Undo2, Redo2 } from 'lucide-react'
import { SparklesIcon } from '@/assets/icons/sparkles'
import { useChangeBackgroundSidebar } from '@/store/use-change-background-sidebar'

export const PromptEditor = () => {
  const prompt = useChangeBackgroundSidebar((s) => s.prompt)
  const setPrompt = useChangeBackgroundSidebar((s) => s.setPrompt)
  const regeneratePrompt = useChangeBackgroundSidebar((s) => s.regeneratePrompt)
  const undo = useChangeBackgroundSidebar((s) => s.undo)
  const redo = useChangeBackgroundSidebar((s) => s.redo)

  return (
    <div className="flex flex-col">
      <textarea
        id="prompt-editor"
        aria-label="Background idea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the background you want..."
        className="min-h-[140px] w-full resize-none rounded-t-xl font-medium border border-gray-light border-b-0 p-4 text-sm outline-none"
      />
      <div className="flex items-center justify-between rounded-b-xl border border-t-0 border-gray-light px-4 py-3">
        <button
          type="button"
          onClick={regeneratePrompt}
          className="flex items-center gap-1 text-xs font-semibold text-black transition-colors cursor-pointer"
        >
          <SparklesIcon />
          Regenerate
        </button>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Undo"
            onClick={undo}
            className="transition-colors text-gray hover:text-black cursor-pointer"
          >
            <Undo2 className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Redo"
            onClick={redo}
            className="transition-colors text-gray hover:text-black cursor-pointer"
          >
            <Redo2 className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
