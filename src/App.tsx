import { useBackgroundStore } from "@/store/use-background-store";
import { ChangeBackgroundSidebar } from "@/components/change-background-sidebar";

function App() {
  const open = useBackgroundStore((s) => s.open);

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
  );
}

export default App;
