export function Feed({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-200 items-center justify-between bg-primary p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">CodeLeap Network</h1>
        <button
          onClick={onLogout}
          className="text-sm font-medium hover:underline"
        >
          Logout
        </button>
      </header>
      <main className="mx-auto min-h-[calc(100svh-80px)] w-full max-w-200 flex-1 bg-white">
        <div className="p-6">
          <p className="text-muted-foreground">
            Feed content will go here (Stage 3).
          </p>
        </div>
      </main>
    </div>
  )
}
