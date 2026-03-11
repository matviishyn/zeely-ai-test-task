import { useChangeBackgroundSidebar } from '@/store/use-change-background-sidebar'
import { ChangeBackgroundSidebar } from '@/components/change-background-sidebar'

export const App = () => {
  const open = useChangeBackgroundSidebar((s) => s.open)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Zeely AI
        </h1>
        <p className="text-base text-neutral-400">
          Avatar Background Generation
        </p>
      </div>

      <button
        type="button"
        onClick={open}
        className="px-8 py-4 rounded-full bg-black text-white font-semibold text-base hover:bg-black/90 transition-colors cursor-pointer"
      >
        Change background
      </button>

      <div className="flex items-center gap-3 text-xs text-neutral-400">
        <span>
          Built by{' '}
          <a
            href="https://github.com/matviishyn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-700 transition-colors underline underline-offset-2"
            aria-label="Visit author's GitHub profile"
          >
            Mykhailo Matviishyn
          </a>
        </span>
        <span className="text-neutral-300" aria-hidden="true">
          |
        </span>
        <a
          href="https://github.com/matviishyn/zeely-ai-test-task"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-neutral-700 transition-colors underline underline-offset-2"
          aria-label="View source code on GitHub"
        >
          Source on GitHub
        </a>
      </div>

      <ChangeBackgroundSidebar />
    </div>
  )
}
