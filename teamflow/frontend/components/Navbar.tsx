export default function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Project Management
        </h2>

        <p className="text-xs text-slate-500">
          Manage your projects and tasks
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          🔔
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            U
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">
              Udaifa
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}