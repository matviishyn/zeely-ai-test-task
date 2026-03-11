import { SparklesGenerateIcon } from '@/assets/icons/sparkles-generate'
import { Button } from '@/components/ui'
import { useBackgroundStore } from '@/store/use-background-store'

export function GenerateButton() {
  const { generate, backgrounds } = useBackgroundStore()
  const isGenerating = backgrounds.some((b) => b.status === 'generating')

  return (
    <Button
      onClick={generate}
      disabled={isGenerating}
      className="w-full h-12 rounded-full bg-black text-white hover:bg-black/90 text-sm font-semibold gap-2 cursor-pointer"
    >
      <SparklesGenerateIcon />
      Generate BG for 1 credit
    </Button>
  )
}
