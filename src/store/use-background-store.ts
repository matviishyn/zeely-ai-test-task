import { useEffect } from 'react'
import { create } from 'zustand'
import type { BackgroundItem, GeneratingBackground } from '@/types/background'
import {
  INITIAL_BACKGROUNDS,
  MOCK_PROMPTS,
  MOCK_AVATAR_IMAGES,
} from '@/data/mock-backgrounds'

const activeIntervals = new Map<string, ReturnType<typeof setInterval>>()

interface BackgroundStoreConfig {
  prompts: string[]
  avatarImages: string[]
  initialBackgrounds: BackgroundItem[]
}

const config: BackgroundStoreConfig = {
  prompts: MOCK_PROMPTS,
  avatarImages: MOCK_AVATAR_IMAGES,
  initialBackgrounds: INITIAL_BACKGROUNDS,
}

interface BackgroundStore {
  isOpen: boolean
  prompt: string
  promptIndex: number
  backgrounds: BackgroundItem[]
  selectedId: string | null

  open: () => void
  close: () => void
  cleanup: () => void
  setPrompt: (prompt: string) => void
  regeneratePrompt: () => void
  undo: () => void
  redo: () => void
  generate: () => void
  selectBackground: (id: string) => void
}

const PROGRESS_STEP = 5
const TICK_MS = 250

const stopInterval = (id: string) => {
  clearInterval(activeIntervals.get(id))
  activeIntervals.delete(id)
}

const clearAllIntervals = () => {
  activeIntervals.forEach((interval) => clearInterval(interval))
  activeIntervals.clear()
}

const getRandomImage = () =>
  config.avatarImages[Math.floor(Math.random() * config.avatarImages.length)]

const formatTimeLeft = (seconds: number): string => {
  if (seconds <= 60) return `${seconds}s left`
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} left`
}

const replaceBackground = (
  backgrounds: BackgroundItem[],
  id: string,
  next: BackgroundItem,
): BackgroundItem[] => backgrounds.map((b) => (b.id === id ? next : b))

const startGenerationInterval = (
  id: string,
  set: (fn: (state: BackgroundStore) => Partial<BackgroundStore>) => void,
) => {
  const interval = setInterval(() => {
    set((state) => {
      const bg = state.backgrounds.find((b) => b.id === id)
      if (!bg || bg.status !== 'generating') {
        stopInterval(id)
        return state
      }

      const newProgress = bg.progress + PROGRESS_STEP

      if (newProgress >= 100) {
        stopInterval(id)
        return {
          backgrounds: replaceBackground(state.backgrounds, id, {
            id,
            status: 'completed',
            imageUrl: getRandomImage(),
          }),
        }
      }

      const secondsLeft = Math.ceil(
        ((100 - newProgress) / PROGRESS_STEP) * (TICK_MS / 1000),
      )

      return {
        backgrounds: replaceBackground(state.backgrounds, id, {
          id,
          status: 'generating',
          progress: newProgress,
          timeLeft: formatTimeLeft(secondsLeft),
        }),
      }
    })
  }, TICK_MS)

  activeIntervals.set(id, interval)
}

export const useBackgroundStore = create<BackgroundStore>((set, get) => ({
  isOpen: false,
  prompt: config.prompts[0],
  promptIndex: 0,
  backgrounds: config.initialBackgrounds,
  selectedId: config.initialBackgrounds[0]?.id ?? null,

  open: () => set({ isOpen: true }),

  close: () => {
    clearAllIntervals()
    set((state) => ({
      isOpen: false,
      backgrounds: state.backgrounds.filter((b) => b.status !== 'generating'),
    }))
  },

  cleanup: () => {
    clearAllIntervals()
  },

  setPrompt: (prompt: string) => set({ prompt }),

  regeneratePrompt: () => {
    const { prompt } = get()
    const otherPrompts = config.prompts.filter((p) => p !== prompt)
    const randomPrompt =
      otherPrompts[Math.floor(Math.random() * otherPrompts.length)]
    set({ prompt: randomPrompt })
  },

  undo: () => {
    const { promptIndex } = get()
    const newIndex =
      (promptIndex - 1 + config.prompts.length) % config.prompts.length
    set({ promptIndex: newIndex, prompt: config.prompts[newIndex] })
  },

  redo: () => {
    const { promptIndex } = get()
    const newIndex = (promptIndex + 1) % config.prompts.length
    set({ promptIndex: newIndex, prompt: config.prompts[newIndex] })
  },

  generate: () => {
    const newId = crypto.randomUUID()
    const newItem: GeneratingBackground = {
      id: newId,
      status: 'generating',
      progress: 0,
      timeLeft: formatTimeLeft(
        Math.ceil((100 / PROGRESS_STEP) * (TICK_MS / 1000)),
      ),
    }

    set((state) => ({
      backgrounds: [newItem, ...state.backgrounds],
    }))

    startGenerationInterval(newId, set)
  },

  selectBackground: (id: string) => {
    const bg = get().backgrounds.find((b) => b.id === id)
    if (bg?.status === 'completed') {
      set({ selectedId: id })
    }
  },
}))

export const useBackgroundCleanup = () => {
  const cleanup = useBackgroundStore((s) => s.cleanup)
  useEffect(() => cleanup, [cleanup])
}
