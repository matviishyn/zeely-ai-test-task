import { useChangeBackgroundSidebar } from '@/store/use-change-background-sidebar'
import { ChangeBackgroundSidebar } from '@/components/change-background-sidebar'

export const App = () => {
  const open = useChangeBackgroundSidebar((s) => s.open)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <button
        type="button"
        onClick={open}
        className="px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-black/90 transition-colors cursor-pointer"
      >
        Change background
      </button>

      <ChangeBackgroundSidebar />
    </div>
  )
}
