import type { BackgroundItem } from '@/types/background'

export const MOCK_PROMPTS = [
  'Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.',
  'A serene sunset over calm ocean waves with soft golden light reflecting on the water surface and gentle clouds drifting across the sky.',
  'Vibrant neon cityscape at night with reflections on wet streets, subtle rain particles, and glowing signage creating an atmospheric urban feel.',
  'Lush green forest with sunbeams filtering through the canopy, floating particles of light, and a misty ethereal atmosphere.',
  'Minimalist studio setup with soft gradient lighting, clean white backdrop, and subtle shadow play for a professional look.',
]

export const MOCK_AVATAR_IMAGES = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face',
]

export const INITIAL_BACKGROUNDS: BackgroundItem[] = [
  {
    id: '1',
    imageUrl: MOCK_AVATAR_IMAGES[0],
    status: 'completed',
    isDefault: true,
  },
  { id: '2', imageUrl: MOCK_AVATAR_IMAGES[1], status: 'completed' },
  { id: '3', imageUrl: MOCK_AVATAR_IMAGES[2], status: 'completed' },
  { id: '4', imageUrl: MOCK_AVATAR_IMAGES[3], status: 'completed' },
  { id: '5', imageUrl: MOCK_AVATAR_IMAGES[4], status: 'completed' },
  { id: '6', imageUrl: MOCK_AVATAR_IMAGES[5], status: 'completed' },
]
