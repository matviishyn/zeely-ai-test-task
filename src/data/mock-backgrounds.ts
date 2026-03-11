import type { BackgroundItem } from '@/types/background'

export const MOCK_PROMPTS = [
  'Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.',
  'A serene sunset over calm ocean waves with soft golden light reflecting on the water surface and gentle clouds drifting across the sky.',
  'Vibrant neon cityscape at night with reflections on wet streets, subtle rain particles, and glowing signage creating an atmospheric urban feel.',
  'Lush green forest with sunbeams filtering through the canopy, floating particles of light, and a misty ethereal atmosphere.',
  'Minimalist studio setup with soft gradient lighting, clean white backdrop, and subtle shadow play for a professional look.',
]

export const MOCK_BACKGROUND_IMAGES = [
  'https://picsum.photos/seed/bg-1/300/400',
  'https://picsum.photos/seed/bg-2/300/400',
  'https://picsum.photos/seed/bg-3/300/400',
  'https://picsum.photos/seed/bg-4/300/400',
  'https://picsum.photos/seed/bg-5/300/400',
  'https://picsum.photos/seed/bg-6/300/400',
]

export const INITIAL_BACKGROUNDS: BackgroundItem[] = [
  {
    id: '1',
    imageUrl: MOCK_BACKGROUND_IMAGES[0],
    status: 'completed',
    isDefault: true,
  },
  { id: '2', imageUrl: MOCK_BACKGROUND_IMAGES[1], status: 'completed' },
  { id: '3', imageUrl: MOCK_BACKGROUND_IMAGES[2], status: 'completed' },
  { id: '4', imageUrl: MOCK_BACKGROUND_IMAGES[3], status: 'completed' },
  { id: '5', imageUrl: MOCK_BACKGROUND_IMAGES[4], status: 'completed' },
  { id: '6', imageUrl: MOCK_BACKGROUND_IMAGES[5], status: 'completed' },
]
