import type { BackgroundItem } from '@/types/background'
import { MOCK_AVATAR_IMAGES } from '@/data/mock-backgrounds'

const PROGRESS_STEP = 5
const TICK_MS = 250

const activeIntervals = new Map<string, ReturnType<typeof setInterval>>()

const getRandomImage = () =>
  MOCK_AVATAR_IMAGES[Math.floor(Math.random() * MOCK_AVATAR_IMAGES.length)]

export const formatTimeLeft = (seconds: number): string => {
  if (seconds <= 60) return `${seconds}s left`
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} left`
}

export const getInitialTimeLeft = () =>
  formatTimeLeft(Math.ceil((100 / PROGRESS_STEP) * (TICK_MS / 1000)))

const replaceBackground = (
  backgrounds: BackgroundItem[],
  id: string,
  next: BackgroundItem,
): BackgroundItem[] => backgrounds.map((b) => (b.id === id ? next : b))

const stopInterval = (id: string) => {
  clearInterval(activeIntervals.get(id))
  activeIntervals.delete(id)
}

export const clearAllGenerations = () => {
  activeIntervals.forEach((interval) => clearInterval(interval))
  activeIntervals.clear()
}

interface GenerationCallbacks {
  getBackgrounds: () => BackgroundItem[]
  setBackgrounds: (backgrounds: BackgroundItem[]) => void
}

export const startGeneration = (
  id: string,
  { getBackgrounds, setBackgrounds }: GenerationCallbacks,
) => {
  const interval = setInterval(() => {
    const backgrounds = getBackgrounds()
    const bg = backgrounds.find((b) => b.id === id)

    if (!bg || bg.status !== 'generating') {
      stopInterval(id)
      return
    }

    const newProgress = bg.progress + PROGRESS_STEP

    if (newProgress >= 100) {
      stopInterval(id)
      setBackgrounds(
        replaceBackground(backgrounds, id, {
          id,
          status: 'completed',
          imageUrl: getRandomImage(),
        }),
      )
      return
    }

    const secondsLeft = Math.ceil(
      ((100 - newProgress) / PROGRESS_STEP) * (TICK_MS / 1000),
    )

    setBackgrounds(
      replaceBackground(backgrounds, id, {
        id,
        status: 'generating',
        progress: newProgress,
        timeLeft: formatTimeLeft(secondsLeft),
      }),
    )
  }, TICK_MS)

  activeIntervals.set(id, interval)
}
