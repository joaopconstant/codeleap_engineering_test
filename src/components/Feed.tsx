export function Feed({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="bg-primary w-full max-w-200 mx-auto p-6 text-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold">CodeLeap Network</h1>
        <button onClick={onLogout} className="text-sm font-medium hover:underline">
          Logout
        </button>
      </header>
      <main className="flex-1 w-full max-w-200 mx-auto bg-white min-h-[calc(100svh-80px)]">
        <div className="p-6">
          <p className="text-muted-foreground">Feed content will go here (Stage 3).</p>
        </div>
      </main>
    </div>
  )
}
