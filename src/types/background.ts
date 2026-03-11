export interface CompletedBackground {
  id: string
  status: 'completed'
  imageUrl: string
  isDefault?: boolean
}

export interface GeneratingBackground {
  id: string
  status: 'generating'
  progress: number
  timeLeft: string
}

export type BackgroundItem = CompletedBackground | GeneratingBackground
