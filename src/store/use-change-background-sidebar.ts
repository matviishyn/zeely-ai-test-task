import { create } from 'zustand'
import type { BackgroundItem, GeneratingBackground } from '@/types/background'
import { INITIAL_BACKGROUNDS, MOCK_PROMPTS } from '@/data/mock-backgrounds'
import {
  clearAllGenerations,
  getInitialTimeLeft,
  startGeneration,
} from '@/services/generation-simulator'

interface ChangeBackgroundSidebarState {
  isOpen: boolean
  prompt: string
  promptIndex: number
  backgrounds: BackgroundItem[]
  selectedId: string | null

  open: () => void
  close: () => void
  setPrompt: (prompt: string) => void
  regeneratePrompt: () => void
  undo: () => void
  redo: () => void
  generate: () => void
  selectBackground: (id: string) => void
}

export const useChangeBackgroundSidebar = create<ChangeBackgroundSidebarState>(
  (set, get) => ({
    isOpen: false,
    prompt: MOCK_PROMPTS[0],
    promptIndex: 0,
    backgrounds: INITIAL_BACKGROUNDS,
    selectedId: INITIAL_BACKGROUNDS[0]?.id ?? null,

    open: () => set({ isOpen: true }),

    close: () => {
      clearAllGenerations()
      set((state) => ({
        isOpen: false,
        backgrounds: state.backgrounds.filter((b) => b.status !== 'generating'),
      }))
    },

    setPrompt: (prompt: string) => set({ prompt }),

    regeneratePrompt: () => {
      const { prompt } = get()
      const otherPrompts = MOCK_PROMPTS.filter((p) => p !== prompt)
      const randomPrompt =
        otherPrompts[Math.floor(Math.random() * otherPrompts.length)]
      set({ prompt: randomPrompt })
    },

    undo: () => {
      const { promptIndex } = get()
      const newIndex =
        (promptIndex - 1 + MOCK_PROMPTS.length) % MOCK_PROMPTS.length
      set({ promptIndex: newIndex, prompt: MOCK_PROMPTS[newIndex] })
    },

    redo: () => {
      const { promptIndex } = get()
      const newIndex = (promptIndex + 1) % MOCK_PROMPTS.length
      set({ promptIndex: newIndex, prompt: MOCK_PROMPTS[newIndex] })
    },

    generate: () => {
      const newId = crypto.randomUUID()
      const newItem: GeneratingBackground = {
        id: newId,
        status: 'generating',
        progress: 0,
        timeLeft: getInitialTimeLeft(),
      }

      set((state) => ({
        backgrounds: [newItem, ...state.backgrounds],
      }))

      startGeneration(newId, {
        getBackgrounds: () => get().backgrounds,
        setBackgrounds: (backgrounds) => set({ backgrounds }),
      })
    },

    selectBackground: (id: string) => {
      const bg = get().backgrounds.find((b) => b.id === id)
      if (bg?.status === 'completed') {
        set({ selectedId: id })
      }
    },
  }),
)
